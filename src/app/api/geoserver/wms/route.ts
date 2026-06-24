import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Read secure/public credentials on the server-side
    const geoserverUrl = process.env.NEXT_PUBLIC_GEOSERVER_URL || process.env.GEOSERVER_URL || "http://localhost:8080/geoserver";
    const workspace = process.env.NEXT_PUBLIC_GEOSERVER_WORKSPACE || process.env.GEOSERVER_WORKSPACE || "assam";
    const user = process.env.NEXT_PUBLIC_GEOSERVER_USER || process.env.GEOSERVER_USER || "";
    const password = process.env.NEXT_PUBLIC_GEOSERVER_PASSWORD || process.env.GEOSERVER_PASSWORD || "";

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
      lulc: process.env.GEOSERVER_LAYER_LULC || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_LULC || "lulc",
      lulc_layer: process.env.GEOSERVER_LAYER_LULC || process.env.NEXT_PUBLIC_GEOSERVER_LAYER_LULC || "lulc"
    };

    // Helper to map and format layers parameter with workspace prepending
    const formatLayersArray = (layerParam: string | null) => {
      if (!layerParam) return "";
      return layerParam.split(",")
        .map(l => l.trim())
        .map(l => {
          const mapped = layerOverrides[l] || l;
          return mapped.includes(":") ? mapped : `${workspace}:${mapped}`;
        })
        .join(",");
    };

    // Construct backend WMS search params dynamically
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      const upperKey = key.toUpperCase();
      if (upperKey === "LAYERS") {
        params.set(key, formatLayersArray(val));
      } else if (upperKey === "QUERY_LAYERS") {
        params.set(key, formatLayersArray(val));
      } else {
        params.set(key, val);
      }
    });

    const targetUrl = `${geoserverUrl}/${workspace}/wms?${params.toString()}`;

    const headers: Record<string, string> = {};
    if (user && password) {
      headers["Authorization"] = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
    }

    // Abort controller with standard WMS rendering query timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(targetUrl, {
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `GeoServer WMS proxy failure. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const imageBlob = await response.blob();

    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", // Cache standard terrain/boundary map tiles heavily
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err: any) {
    console.warn(`GeoServer WMS Proxy failed: ${err.message}`);
    return NextResponse.json(
      { error: "Failed to load tiles from GeoServer WMS", details: err.message },
      { status: 502 }
    );
  }
}
