import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const layer = searchParams.get("layer");
    const format = searchParams.get("format") || "application/json";
    const service = searchParams.get("service") || "WFS"; // WFS or WMS

    if (!layer) {
      return NextResponse.json({ error: "Layer parameter is required" }, { status: 400 });
    }

    const geoserverUrl = process.env.NEXT_PUBLIC_GEOSERVER_URL || process.env.GEOSERVER_URL || "http://localhost:8080/geoserver";
    const workspace = process.env.NEXT_PUBLIC_GEOSERVER_WORKSPACE || process.env.GEOSERVER_WORKSPACE || "assam";
    const user = process.env.NEXT_PUBLIC_GEOSERVER_USER || process.env.GEOSERVER_USER || "";
    const password = process.env.NEXT_PUBLIC_GEOSERVER_PASSWORD || process.env.GEOSERVER_PASSWORD || "";

    // Resolve typename overrides from environment variables
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
    const typenameParam = targetLayer.includes(":") ? targetLayer : `${workspace}:${targetLayer}`;

    let targetUrl = "";

    // Approximate bounding box enclosing the Assam region in decimal degrees (EPSG:4326)
    // Left: 89.6, Bottom: 24.1, Right: 96.2, Top: 28.3
    const assamBBox4326 = "89.6,24.1,96.2,28.3";

    if (service === "WMS") {
      if (format === "kml" || format === "application/vnd.google-earth.kml+xml") {
        // High fidelity KML generator link
        targetUrl = `${geoserverUrl}/${workspace}/wms/kml?layers=${typenameParam}`;
      } else {
        // Standard WMS GetMap rendering request
        targetUrl = `${geoserverUrl}/${workspace}/wms?service=WMS&version=1.1.1&request=GetMap&layers=${typenameParam}&format=${encodeURIComponent(format)}&srs=EPSG:4326&bbox=${assamBBox4326}&width=1200&height=800`;
      }
    } else {
      // Standard WFS GetFeature digital data request
      targetUrl = `${geoserverUrl}/${workspace}/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=${typenameParam}&outputFormat=${encodeURIComponent(format)}&srsname=EPSG:4326`;
    }

    const headers: Record<string, string> = {};
    if (user && password) {
      headers["Authorization"] = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Allow higher timeout for file zip generation

    const response = await fetch(targetUrl, {
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `GeoServer returned status ${response.status} when rendering the resource.` },
        { status: response.status }
      );
    }

    // Set readable content-disposition and types according to the requesting file extension
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const fileExtensionMap: Record<string, string> = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/geotiff": "tif",
      "application/pdf": "pdf",
      "shape-zip": "zip",
      "application/json": "json",
      "json": "json",
      "csv": "csv",
      "kml": "kml",
      "application/vnd.google-earth.kml+xml": "kml"
    };

    const ext = fileExtensionMap[format] || "bin";
    const fileName = `${layer}_export.${ext}`;

    const fileBuffer = await response.arrayBuffer();

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store, max-age=0"
      }
    });

  } catch (err: any) {
    console.warn(`GeoServer Download Proxy failed: ${err.message}`);
    return NextResponse.json(
      { 
        error: "Connection failed to GeoServer", 
        details: err.message,
        hint: "Please verify that the target Layer is published in your GeoServer and that the server has completed startup."
      },
      { status: 502 }
    );
  }
}
