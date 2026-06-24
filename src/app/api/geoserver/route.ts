import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const layer = searchParams.get("layer");
    const bbox = searchParams.get("bbox");
    
    if (!layer) {
      return NextResponse.json({ error: "Layer parameter is required" }, { status: 400 });
    }

    // Read the secret/public credentials secure on the server-side
    const geoserverUrl = process.env.NEXT_PUBLIC_GEOSERVER_URL || process.env.GEOSERVER_URL || "http://localhost:8080/geoserver";
    const workspace = process.env.NEXT_PUBLIC_GEOSERVER_WORKSPACE || process.env.GEOSERVER_WORKSPACE || "assam";
    const user = process.env.NEXT_PUBLIC_GEOSERVER_USER || process.env.GEOSERVER_USER || "";
    const password = process.env.NEXT_PUBLIC_GEOSERVER_PASSWORD || process.env.GEOSERVER_PASSWORD || "";

    // Resolve the actual spatial layer typename from environment variables or safe defaults
    const layerOverrides: Record<string, string | undefined> = {
      state_boundary: process.env.GEOSERVER_LAYER_STATE_BOUNDARY || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_STATE_BOUNDARY,
      district_boundary: process.env.GEOSERVER_LAYER_DISTRICT_BOUNDARY || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_DISTRICT_BOUNDARY,
      cgwb_data: process.env.GEOSERVER_LAYER_CGWB_DATA || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_CGWB_DATA,
      river_network: process.env.GEOSERVER_LAYER_RIVER_NETWORK || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_RIVER_NETWORK,
      wetland: process.env.GEOSERVER_LAYER_WETLAND || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_WETLAND,
      waterbodies_amrut: process.env.GEOSERVER_LAYER_WATERBODIES_AMRUT || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_WATERBODIES_AMRUT,
      ward_boundary: process.env.GEOSERVER_LAYER_WARD_BOUNDARY || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_WARD_BOUNDARY,
      state_highway: process.env.GEOSERVER_LAYER_STATE_HIGHWAY || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_STATE_HIGHWAY,
      soil_texture: process.env.GEOSERVER_LAYER_SOIL_TEXTURE || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_SOIL_TEXTURE,
      revenue_circle: process.env.GEOSERVER_LAYER_REVENUE_CIRCLE || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_REVENUE_CIRCLE,
      reserve_forests: process.env.GEOSERVER_LAYER_RESERVE_FORESTS || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_RESERVE_FORESTS,
      pwd_landmark: process.env.GEOSERVER_LAYER_PWD_LANDMARK || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_PWD_LANDMARK,
      protected_areas: process.env.GEOSERVER_LAYER_PROTECTED_AREAS || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_PROTECTED_AREAS,
      bridge_points: process.env.GEOSERVER_LAYER_BRIDGE_POINTS || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_BRIDGE_POINTS,
      rtdas: process.env.GEOSERVER_LAYER_RTDAS || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_RTDAS,
      nhp_rtdas: process.env.GEOSERVER_LAYER_NHP_RTDAS || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_NHP_RTDAS,
      embankment: process.env.GEOSERVER_LAYER_EMBANKMENT || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_EMBANKMENT,
      sluice_gates: process.env.GEOSERVER_LAYER_SLUICE_GATES || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_SLUICE_GATES,
      basin_boundary: process.env.GEOSERVER_LAYER_BASIN_BOUNDARY || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_BASIN_BOUNDARY,
      flood_layer_2024: process.env.GEOSERVER_LAYER_FLOOD_LAYER_2024 || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_FLOOD_LAYER_2024 || "flood_layer_2024",
      flood_layer_2023: process.env.GEOSERVER_LAYER_FLOOD_LAYER_2023 || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_FLOOD_LAYER_2023 || "flood_layer_2023",
      flood_layer_2022: process.env.GEOSERVER_LAYER_FLOOD_LAYER_2022 || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_FLOOD_LAYER_2022 || "flood_layer_2022",
      flood_layer_2021: process.env.GEOSERVER_LAYER_FLOOD_LAYER_2021 || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_FLOOD_LAYER_2021 || "flood_layer_2021",
      flood_layer_2020: process.env.GEOSERVER_LAYER_FLOOD_LAYER_2020 || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_FLOOD_LAYER_2020 || "flood_layer_2020",
      lulc_layer: process.env.GEOSERVER_LAYER_LULC || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_LULC || "lulc",
      lulc: process.env.GEOSERVER_LAYER_LULC || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_LULC || "lulc"
    };

    const targetLayer = layerOverrides[layer] || layer;

    // Support absolute workspace bypass: if targetLayer contains a workspace colon (e.g., "mywork:cg_well"), do not prepend default workspace
    const typenameParam = targetLayer.includes(":") ? targetLayer : `${workspace}:${targetLayer}`;

    // Assemble the complete Web Feature Service (WFS) URL in standard EPSG:3857 (reprojected)
    let url = `${geoserverUrl}/${workspace}/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=${typenameParam}&outputFormat=application/json&srsname=EPSG:3857`;
    
    if (bbox) {
      url += `&bbox=${bbox},EPSG:3857`;
    }

    const headers: Record<string, string> = {
      "Accept": "application/json"
    };

    if (user && password) {
      headers["Authorization"] = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
    }

    // Keep standard timeout of 6 seconds to prevent server hangs on disconnected local ports
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `GeoServer connection error. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=120, stale-while-revalidate=300",
      }
    });

  } catch (err: any) {
    console.warn(`GeoServer Server Proxy [${req.url}] failed or timed out: ${err.message}`);
    return NextResponse.json(
      { 
        error: "Failed to connect to local or remote GeoServer", 
        details: err.message,
        hint: "Ensure your desktop GeoServer is running on port 8080 and PostGIS contains appropriate feature classes." 
      },
      { status: 502 }
    );
  }
}
