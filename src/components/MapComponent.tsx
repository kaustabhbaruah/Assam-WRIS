"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import XYZ from "ol/source/XYZ";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import BaseLayer from "ol/layer/Base";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
// import { Filter, Check, RotateCcw, ChevronDown, Database, Eye } from "lucide-react";
import { Filter, Check, RotateCcw, ChevronDown, Database, Eye, Layers, Compass, MapPin } from "lucide-react";


interface MapComponentProps {
  onMapReady: (map: Map) => void;
  activeLayers?: { id: string; name: string; color: string; type: string; }[];
  isStateBoundaryVisible?: boolean;
  isDistrictBoundaryVisible?: boolean;
  isCGWBLayerVisible?: boolean;
  isRiverNetworkVisible?: boolean;
  isWetlandVisible?: boolean;
  isWaterbodiesAmrutVisible?: boolean;
  isWardBoundaryVisible?: boolean;
  isStateHighwayVisible?: boolean;
  isSoilTextureVisible?: boolean;
  isRevenueCircleVisible?: boolean;
  isReserveForestsVisible?: boolean;
  isPwdLandmarkVisible?: boolean;
  isProtectedAreasVisible?: boolean;
  isBridgePointsVisible?: boolean;
  isRtdasVisible?: boolean;
  isNhpRtdasVisible?: boolean;
  isEmbankmentVisible?: boolean;
  isSluiceGatesVisible?: boolean;
  isBasinBoundaryVisible?: boolean;
  isLULCLayerVisible?: boolean;
  isFloodLayersVisible?: boolean;
  selectedFloodYear?: string;

  [key: string]: any; // Allows custom user integrations dynamically (like isCgwbVisible) without causing fatal compilation errors
}

// Dynamic configuration parameters for personal or remote GeoServer connections
const GEOSERVER_URL = process.env.NEXT_PUBLIC_GEOSERVER_URL || "http://localhost:8080/geoserver";
const GEOSERVER_WORKSPACE = process.env.NEXT_PUBLIC_GEOSERVER_WORKSPACE || "assam";
const GEOSERVER_USER = process.env.NEXT_PUBLIC_GEOSERVER_USER || "";
const GEOSERVER_PASSWORD = process.env.NEXT_PUBLIC_GEOSERVER_PASSWORD || "";

// Cache for converted Hex to RGBA strings to avoid parsing overhead
const rgbaCache: Record<string, string> = {};

// Convert Hex colors to lightweight transparent colors (with caching)
function convertHexToRgba(hex: string, alpha: number) {
  const cacheKey = `${hex}_${alpha}`;
  if (rgbaCache[cacheKey]) {
    return rgbaCache[cacheKey];
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const result = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  rgbaCache[cacheKey] = result;
  return result;
}

// Global cache for OpenLayers Style objects to prevent heavy re-allocation and GC pressure on every frame
const styleCache: Record<string, Style> = {};

// Generates small point & thin polygon outlines
const getStyleForLayer = (layerId: string, isHighlighted: boolean = false, feature?: any) => {
  // Determine geometry type to retrieve matching styles from cache
  let geomType = "Polygon";
  if (feature) {
    const geom = feature.getGeometry();
    if (geom) {
      geomType = geom.getType();
    }
  }

  // Handle high-performance reusable vector styles for overlays (selection, hover, drawing)
  const styleKey = `${layerId}_${geomType}_${isHighlighted ? 'highlight' : 'normal'}`;
  if (styleCache[styleKey]) {
    return styleCache[styleKey];
  }

  let styleInstance: Style;

  if (isHighlighted) {
    if (geomType === "Point" || geomType === "MultiPoint") {
      styleInstance = new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: "#f59e0b" }), // Highlight color: Amber
          stroke: new Stroke({ color: "#ffffff", width: 2 }),
        }),
      });
    } else if (geomType === "LineString" || geomType === "MultiLineString") {
      styleInstance = new Style({
        stroke: new Stroke({
          color: "#f59e0b",
          width: 3.5,
        }),
      });
    } else {
      styleInstance = new Style({
        stroke: new Stroke({
          color: "#ffffff",
          width: 2.5,
        }),
        fill: new Fill({
          color: convertHexToRgba("#f59e0b", 0.55),
        }),
      });
    }
  } else {
    // Normal / Unhighlighted styles matching geometry (subtle, transparent fallback)
    if (geomType === "Point" || geomType === "MultiPoint") {
      styleInstance = new Style({
        image: new CircleStyle({
          radius: 4,
          fill: new Fill({ color: "rgba(100, 116, 139, 0.4)" }),
          stroke: new Stroke({ color: "rgba(255, 255, 255, 0.5)", width: 1 }),
        }),
      });
    } else if (geomType === "LineString" || geomType === "MultiLineString") {
      styleInstance = new Style({
        stroke: new Stroke({
          color: "rgba(100, 116, 139, 0.4)",
          width: 1.5,
        }),
      });
    } else {
      styleInstance = new Style({
        stroke: new Stroke({
          color: "rgba(100, 116, 139, 0.4)",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(100, 116, 139, 0.08)",
        }),
      });
    }
  }

  styleCache[styleKey] = styleInstance;
  return styleInstance;
};


const getBasemapSource = (type: "osm" | "satellite" | "light" | "dark") => {
  switch (type) {
    case "satellite":
      return new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 19,
        attributions: "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      });
    case "light":
      return new XYZ({
        url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        maxZoom: 20,
        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      });
    case "dark":
      return new XYZ({
        url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        maxZoom: 20,
        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      });
    case "osm":
    default:
      return new OSM();
  }
};


/**
 * Modern High-Performance OpenLayers GIS Component
 */
export default function MapComponent({ 
  onMapReady, 
  activeLayers = [],
  isStateBoundaryVisible = true,
  isDistrictBoundaryVisible = false,
  isCGWBLayerVisible = false,
  isRiverNetworkVisible = true, 
  isWetlandVisible = false,
  isWaterbodiesAmrutVisible = false,
  isWardBoundaryVisible = false,
  isStateHighwayVisible = false,
  isSoilTextureVisible = false,
  isRevenueCircleVisible = false,
  isReserveForestsVisible = false,
  isPwdLandmarkVisible = false,
  isProtectedAreasVisible = false,
  isBridgePointsVisible = false,
  isRtdasVisible = false,
  isNhpRtdasVisible = false,
  isEmbankmentVisible = false,
  isSluiceGatesVisible = false,
  isBasinBoundaryVisible = false,
  isLULCLayerVisible = false,
  isFloodLayersVisible = false,
  selectedFloodYear = "2024"

}: MapComponentProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const popupElement = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  // Active fetch abort controllers to support request cancellation during zoom/pan
  const activeControllersRef = useRef<Record<string, AbortController>>({});

  // Monitor layers with connection errors (e.g., local GeoServer port 8080 unreachable inside high-security cloud runner preview)
  const [geoServerErrors, setGeoServerErrors] = useState<string[]>([]);

  // Creates a robust WFS vector source through the secure relative Next.js API Proxy
  const createGeoServerVectorSource = (layerName: string) => {
    return new VectorSource({
      format: new GeoJSON(),
      loader: function (extent, resolution, projection, success, failure) {
        // Zoom-dependent visibility and load optimization (Resolution is in projection meters/pixel)
        // High resolution = zoomed out. Low resolution = zoomed in.
        const heavyLayers: Record<string, number> = {
          lulc: 160,           // load only at zoom >= 10
          soil_texture: 310,   // load only at zoom >= 9
          waterbodies_amrut: 310, // load only at zoom >= 9
          pwd_landmark: 160,   // load only at zoom >= 10
          ward_boundary: 310,  // load only at zoom >= 9
        };

        if (heavyLayers[layerName] && resolution > heavyLayers[layerName]) {
          // Zoomed out too far for heavy layers – don't fetch from network, clear current features to reclaim memory
          this.clear(true);
          if (success) success([]);
          return;
        }

        // If there is an ongoing fetch request for this exact layer, cancel it to avoid concurrent request queueing
        if (activeControllersRef.current[layerName]) {
          try {
            activeControllersRef.current[layerName].abort();
          } catch (_) {}
        }

        const controller = new AbortController();
        activeControllersRef.current[layerName] = controller;

        // Query the relative Next.js Server-Side API proxy to avoid browser Mixed Content (HTTPS -> HTTP) and Origin CORS blocks
        const url = `/api/geoserver?layer=${layerName}&bbox=${extent.join(",")}`;

        fetch(url, { signal: controller.signal })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Proxy-to-GeoServer communication error (Status: ${response.status})`);
            }
            return response.json();
          })
          .then((data) => {
            if (activeControllersRef.current[layerName] === controller) {
              delete activeControllersRef.current[layerName];
            }
            const features = new GeoJSON().readFeatures(data);
            
            features.forEach((f) => {
              f.set("layer_id", layerName);
            });

            // Feature load succeeded, clear any pre-existing connection errors for this layer
            setGeoServerErrors((prev) => prev.filter((name) => name !== layerName));

            // Clear old features to prevent high browser memory consumption on map panning
            this.clear(true);

            this.addFeatures(features);
            if (success) success(features);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              // Ignore expected abort errors
              return;
            }
            if (activeControllersRef.current[layerName] === controller) {
              delete activeControllersRef.current[layerName];
            }
            console.warn(`GIS Info: GeoServer connection failed or layer 404 on [${layerName}]: ${err.message}`);
            
            // Log connection error to display in the UI Status badge
            setGeoServerErrors((prev) => {
              if (!prev.includes(layerName)) {
                return [...prev, layerName];
              }
              return prev;
            });

            if (failure) failure();
          });
      },
      strategy: (extent) => [extent],
    });
  };

  // Layer references (Supports both VectorLayer and TileLayer/WMS dynamically)
  const layerRefs = useRef<Record<string, BaseLayer | null>>({
    state_boundary: null,
    district_boundary: null,
    cgwb_data: null,
    river_network: null,
    wetland: null,
    waterbodies_amrut: null,
    ward_boundary: null,
    state_highway: null,
    soil_texture: null,
    revenue_circle: null,
    reserve_forests: null,
    protected_areas: null,
    pwd_landmarks: null,
    bridge_points: null,
    rtdas: null,
    nhp_rtdas: null,
    embankment: null,
    sluice_gates: null,
    basin_boundary: null,
    flood_layer_2024: null,
    flood_layer_2023: null,
    flood_layer_2022: null,
    flood_layer_2021: null,
    flood_layer_2020: null,
    lulc: null
  });

  // Native WMS GetFeatureInfo click highlight overlay source and layer
  const highlightSourceRef = useRef<VectorSource | null>(null);

  // Performance Instrumentation states (TASK 9)
  const [wmsResponseTime, setWmsResponseTime] = useState<number | null>(null);
  const [lastLayerLoadTime, setLastLayerLoadTime] = useState<number | null>(null);

  // Client-side React Filter States
  const [activeFilterField, setActiveFilterField] = useState<string>("");
  const [activeFilterValue, setActiveFilterValue] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  

  const [basemapType, setBasemapType] = useState<"osm" | "satellite" | "light" | "dark">("osm");
  const [isBasemapOpen, setIsBasemapOpen] = useState<boolean>(false);
  const basemapLayerRef = useRef<TileLayer<any> | null>(null);


  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [uniqueValues, setUniqueValues] = useState<string[]>([]);
  const [currentScale, setCurrentScale] = useState<number>(0);
  const [hoverCoords, setHoverCoords] = useState<{ lat: number; lon: number } | null>(null);
  
  const [counts, setCounts] = useState({ totalBeforeFilter: 0, visibleAfterFilter: 0 });

  // Props synchronization Ref
  const visibilityPropsRef = useRef({
    state_boundary: isStateBoundaryVisible,
    district_boundary: isDistrictBoundaryVisible,
    cgwb_data: isCGWBLayerVisible,
    river_network: isRiverNetworkVisible,
    wetland: isWetlandVisible,
    waterbodies_amrut: isWaterbodiesAmrutVisible,
    ward_boundary: isWardBoundaryVisible,
    state_highway: isStateHighwayVisible,
    soil_texture: isSoilTextureVisible,
    revenue_circle: isRevenueCircleVisible,
    reserve_forests: isReserveForestsVisible,
    protected_areas: isProtectedAreasVisible,
    pwd_landmark: isPwdLandmarkVisible,
    bridge_points: isBridgePointsVisible,
    rtdas: isRtdasVisible,
    nhp_rtdas: isNhpRtdasVisible,
    embankment: isEmbankmentVisible,
    sluice_gates: isSluiceGatesVisible,
    basin_boundary: isBasinBoundaryVisible,
    lulc: isLULCLayerVisible,
    flood_layer_2024: !!isFloodLayersVisible && selectedFloodYear === "2024",
    flood_layer_2023: !!isFloodLayersVisible && selectedFloodYear === "2023",
    flood_layer_2022: !!isFloodLayersVisible && selectedFloodYear === "2022",
    flood_layer_2021: !!isFloodLayersVisible && selectedFloodYear === "2021",
    flood_layer_2020: !!isFloodLayersVisible && selectedFloodYear === "2020"
  });

  useEffect(() => {
    visibilityPropsRef.current = {
      state_boundary: isStateBoundaryVisible,
    district_boundary: isDistrictBoundaryVisible,
    cgwb_data: isCGWBLayerVisible,
    river_network: isRiverNetworkVisible,
    wetland: isWetlandVisible,
    waterbodies_amrut: isWaterbodiesAmrutVisible,
    ward_boundary: isWardBoundaryVisible,
    state_highway: isStateHighwayVisible,
    soil_texture: isSoilTextureVisible,
    revenue_circle: isRevenueCircleVisible,
    reserve_forests: isReserveForestsVisible,
    protected_areas: isProtectedAreasVisible,
    pwd_landmark: isPwdLandmarkVisible,
    bridge_points: isBridgePointsVisible,
    rtdas: isRtdasVisible,
    nhp_rtdas: isNhpRtdasVisible,
    embankment: isEmbankmentVisible,
    sluice_gates: isSluiceGatesVisible,
    basin_boundary: isBasinBoundaryVisible,
    lulc: isLULCLayerVisible,
    flood_layer_2024: !!isFloodLayersVisible && selectedFloodYear === "2024",
    flood_layer_2023: !!isFloodLayersVisible && selectedFloodYear === "2023",
    flood_layer_2022: !!isFloodLayersVisible && selectedFloodYear === "2022",
    flood_layer_2021: !!isFloodLayersVisible && selectedFloodYear === "2021",
    flood_layer_2020: !!isFloodLayersVisible && selectedFloodYear === "2020"
    };
  }, [
    isStateBoundaryVisible, isDistrictBoundaryVisible, isCGWBLayerVisible, isRiverNetworkVisible, isWetlandVisible, isWaterbodiesAmrutVisible,isWardBoundaryVisible, isStateHighwayVisible, isSoilTextureVisible,isRevenueCircleVisible, isReserveForestsVisible, isProtectedAreasVisible, isPwdLandmarkVisible, isBridgePointsVisible, isRtdasVisible, isNhpRtdasVisible, isEmbankmentVisible, isSluiceGatesVisible, isBasinBoundaryVisible, isLULCLayerVisible, selectedFloodYear, isFloodLayersVisible
  ]);


  // Synchronically react to selected basemaps changes and dynamically swap tile sources
  useEffect(() => {
    if (basemapLayerRef.current) {
      basemapLayerRef.current.setSource(getBasemapSource(basemapType));
    }
  }, [basemapType]);


  // Create core OpenLayers map instance
  useEffect(() => {
    if (!mapElement.current || !popupElement.current) return;

    let initialMap: Map | null = null;
    let overlay: Overlay | null = null;

    try {
      overlay = new Overlay({
        element: popupElement.current,
        autoPan: false, // Ensures the map centers perfectly on the precise feature coordinate computed, with no panning disturbance
        positioning: "bottom-center",
        offset: [0, -10], // Sits beautifully above the point marker pixel
        stopEvent: true,
      });


      const defaultBasemapLayer = new TileLayer({
        source: getBasemapSource(basemapType),
        properties: { title: "Base Map" }
      });
      basemapLayerRef.current = defaultBasemapLayer;

      // Click selection highlight layer (For displaying WMS selected polygons)
      const highlightSource = new VectorSource();
      highlightSourceRef.current = highlightSource;
      const highlightLayer = new VectorLayer({
        source: highlightSource,
        style: new Style({
          stroke: new Stroke({
            color: "#f59e0b",
            width: 3,
          }),
          fill: new Fill({
            color: convertHexToRgba("#f59e0b", 0.35)
          }),
        }),
      });


      initialMap = new Map({
        target: mapElement.current,
        overlays: [overlay],
        controls: [], 
        layers: [
          defaultBasemapLayer,
          highlightLayer
        ],
        view: new View({
          center: fromLonLat([92.9376, 26.2006]),
          zoom: 8,
        }),
      });

      // Internal popup renderer helper
      const renderPopup = (props: any, layerId: string, targetCoordinate: number[], view: View, overlayInstance: Overlay) => {
        // Center the map precisely on the selected feature
        view.animate({
          center: targetCoordinate,
          duration: 450,
        });

        // Hide overlay first to prevent transient visual ghosting
        overlayInstance?.setPosition(undefined);
        if (popupElement.current) popupElement.current.style.display = "none";

        // Determine friendly label from metadata keys or attributes
        const layerTitle = props.STATION_NAME ? "Gauge Station" : 
                          (props.district_n ? "Ground-Water Node" : 
                           (props.waterbody_ ? "Water Resource" : 
                            (props.DISTRICT ? "District Polygon" : "Basin Feature")));

        const dotColor = "#06b6d4";

        popupElement.current!.innerHTML = `
          <div class="relative p-5 min-w-[240px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-blue-50 dark:border-slate-800 animate-in fade-in zoom-in duration-200 pointer-events-auto">
            <button class="popup-close-btn absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-slate-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3 mb-3 pr-6">
              <div class="flex flex-col">
                <h4 class="font-bold text-[12px] text-primary-blue dark:text-cyan-400 uppercase tracking-tight">${layerTitle}</h4>
                <span class="text-[8px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Assam Geospatial Node</span>
              </div>
              <div class="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm" style="background-color: ${dotColor}"></div>
            </div>
            <div class="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              ${Object.entries(props)
                .filter(([key]) => key !== "geometry" && key !== "boundedBy" && key !== "bbox" && key !== "layer_id")
                .map(([key, val]) => `
                  <div class="flex flex-col group/item pointer-events-auto">
                    <span class="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.1em] leading-tight">${key.replace(/_/g, " ")}</span>
                    <span class="text-[11px] font-bold text-gray-700 dark:text-slate-200 mt-0.5">${val}</span>
                  </div>
                `).join("")}
            </div>
            <div class="mt-4 pt-3 border-t border-gray-50 dark:border-slate-800 flex justify-end">
               <span class="text-[8px] font-black text-primary-blue/40 uppercase tracking-widest leading-none">Spatial Intelligence</span>
            </div>
          </div>
        `;

        overlayInstance?.setPosition(targetCoordinate);
        popupElement.current!.style.display = "block";
      };

      // Unified vector/WMS single-click interaction and centering
      initialMap.on("singleclick", async (evt) => {
        const coordinate = evt.coordinate;
        const view = initialMap!.getView();
        
        // Clear previous selected highlights on all visible vector layers
        initialMap!.getLayers().forEach((l) => {
          if (l instanceof VectorLayer) {
            const src = l.getSource();
            if (src) {
              src.getFeatures().forEach((f: any) => {
                if (typeof f.get === "function" && f.get("selected")) {
                  f.unset("selected");
                  f.changed();
                }
              });
            }
          }
        });

        // Reset temporary highlight vector polygon
        if (highlightSourceRef.current) {
          highlightSourceRef.current.clear();
        }

        let foundFeature = false;

        // 1. First, query any active browser-side vector features (Category B)
        initialMap!.forEachFeatureAtPixel(evt.pixel, (feature) => {
          if (foundFeature) return;
          const f = feature as any;
          const layerId = f.get("layer_id") || "default";

          if (layerId === "wms_highlight") return;

          // Mark as selected to activate vector selection style
          if (typeof f.set === "function") {
            f.set("selected", true);
            f.changed();
          }
          foundFeature = true;

          let targetCoordinate = coordinate;
          const geom = f.getGeometry();
          if (geom) {
            const geomType = geom.getType();
            if (geomType === "Point") {
              targetCoordinate = (geom as Point).getCoordinates();
            } else {
              const extent = geom.getExtent();
              targetCoordinate = [
                (extent[0] + extent[2]) / 2,
                (extent[1] + extent[3]) / 2
              ];
            }
          }

          renderPopup(f.getProperties(), layerId, targetCoordinate, view, overlay!);
        });

        // 2. Query active server-side WMS layers (GetFeatureInfo with smart overlay prioritization)
        if (!foundFeature) {
          const visibleWmsLayers = Object.entries(visibilityPropsRef.current)
            .filter(([id, isVisible]) => isVisible)
            .map(([id]) => id);

          if (visibleWmsLayers.length > 0) {
            // Sort layers so background boundaries are queried last, and thematic overlays are queried first
            const layerPriority: Record<string, number> = {
              state_boundary: 1,
              district_boundary: 2,
              ward_boundary: 3,
              revenue_circle: 4,
              soil_texture: 10,
              lulc: 11,
              reserve_forests: 12,
              protected_areas: 13,
              wetland: 14,
              waterbodies_amrut: 15,
              basin_boundary: 16,
              river_network: 17,
              embankment: 18,
              pwd_landmark: 30,
              bridge_points: 31,
              rtdas: 32,
              nhp_rtdas: 33,
              cgwb_data: 34,
              sluice_gates: 35,
              flood_layer_2024: 50,
              flood_layer_2023: 50,
              flood_layer_2022: 50,
              flood_layer_2021: 50,
              flood_layer_2020: 50,
            };

            visibleWmsLayers.sort((a, b) => {
              const prioA = layerPriority[a] || 5;
              const prioB = layerPriority[b] || 5;
              return prioA - prioB;
            });

            // Select foremost visible layer (overlay priority)
            const targetId = visibleWmsLayers[visibleWmsLayers.length - 1];
            const size = initialMap!.getSize();
            const extent = view.calculateExtent();

            // Store request start performance counter (TASK 9)
            const queryStartTime = performance.now();

            const queryUrl = `/api/geoserver/wms` +
              `?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo` +
              `&LAYERS=${targetId}` +
              `&QUERY_LAYERS=${targetId}` +
              `&INFO_FORMAT=application/json` +
              `&X=${Math.round(evt.pixel[0])}` +
              `&Y=${Math.round(evt.pixel[1])}` +
              `&WIDTH=${Math.round(size![0])}` +
              `&HEIGHT=${Math.round(size![1])}` +
              `&BBOX=${extent.join(",")}` +
              `&SRS=EPSG:3857`;

            try {
              const response = await fetch(queryUrl);
              const queryEndTime = performance.now();
              setWmsResponseTime(queryEndTime - queryStartTime); // Log response time count

              if (response.ok) {
                const geojson = await response.json();
                if (geojson && geojson.features && geojson.features.length > 0) {
                  const rawFeature = geojson.features[0];
                  const olFeatures = new GeoJSON().readFeatures(geojson);

                  if (olFeatures.length > 0) {
                    const clickedFeature = olFeatures[0];
                    clickedFeature.set("layer_id", "wms_highlight");

                    if (highlightSourceRef.current) {
                      highlightSourceRef.current.addFeature(clickedFeature);
                    }

                    let targetCoordinate = coordinate;
                    const geom = clickedFeature.getGeometry();
                    if (geom) {
                      const extent = geom.getExtent();
                      targetCoordinate = [
                        (extent[0] + extent[2]) / 2,
                        (extent[1] + extent[3]) / 2
                      ];
                    }

                    renderPopup(rawFeature.properties, targetId, targetCoordinate, view, overlay!);
                    foundFeature = true;
                  }
                }
              }
            } catch (err) {
              console.warn("WMS GetFeatureInfo execution failed: ", err);
            }
          }
        }

        // Hide overlay if clicking non-feature area
        if (!foundFeature) {
          overlay?.setPosition(undefined);
          if (popupElement.current) popupElement.current.style.display = "none";
        }
      });

      // Track pointer move to show live hover coordinates in lat/lon
      initialMap.on("pointermove", (evt) => {
        if (evt.dragging) return;
        const coordinate = evt.coordinate;
        if (coordinate) {
          const lonLat = toLonLat(coordinate);
          setHoverCoords({ lon: lonLat[0], lat: lonLat[1] });
        }
      });

      // Dynamically compute and sync the map scale on movement and zoom changes
      const updateScale = () => {
        const view = initialMap!.getView();
        if (view) {
          const resolution = view.getResolution();
          if (resolution !== undefined) {
            const center = view.getCenter();
            let mpu = 1;
            if (center) {
              const lonLat = toLonLat(center);
              const latRad = (lonLat[1] * Math.PI) / 180;
              mpu = Math.cos(latRad);
            }
            // 96 DPI screen standard has 3779.53 pixels per meter
            const scaleDenominator = Math.round(resolution * mpu * 3779.53);
            setCurrentScale(scaleDenominator);
          }
        }
      };

      initialMap.on("moveend", updateScale);
      updateScale(); // calculate first time scale on mount

      // Floating close delegate listener inside HTML popup
      popupElement.current.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest(".popup-close-btn")) {
          overlay?.setPosition(undefined);
          if (popupElement.current) popupElement.current.style.display = "none";
        }
      });

      mapInstanceRef.current = initialMap;
      onMapReady(initialMap);
    } catch (err) {
      console.error("GIS: Error occurred constructing core mapping system: ", err);
    }

    return () => {
      initialMap?.setTarget(undefined);
    };
  }, [onMapReady]);

  // Handle addition and updating of Vector and WMS Layers (Flexible Factory and Scale Constraints)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Polymorphic Layer Factory (TASK 4 & TASK 7)
    const syncMapLayer = (
      layerKey: string, 
      isVisible: boolean, 
      layerType: "wms" | "vector",
      minZoom?: number,
      maxZoom?: number
    ) => {
      const activeLayers = map.getLayers().getArray();
      let layer = layerRefs.current[layerKey];

      const styleFunc = (feature: any) => {
        // Vector Client filtering active
        if (activeFilterField && activeFilterValue) {
          const val = feature.get(activeFilterField);
          if (val === undefined || String(val) !== activeFilterValue) {
            return undefined; // Return undefined to completely hide unmatched features
          }
          // Highlight the matched features
          return getStyleForLayer(layerKey, true, feature);
        }
        // Direct map point selection highlight active
        if (feature.get("selected")) {
          return getStyleForLayer(layerKey, true, feature);
        }
        return getStyleForLayer(layerKey, false, feature);
      };

      if (isVisible) {
        if (!layer) {
          const startTime = performance.now();
          if (layerType === "wms") {
            // WMS layer initialized
            layer = new TileLayer({
              source: new TileWMS({
                url: "/api/geoserver/wms",
                params: {
                  "LAYERS": layerKey,
                  "TILED": true,
                  "VERSION": "1.1.1",
                },
                serverType: "geoserver",
                crossOrigin: "anonymous"
              }),
              properties: { id: layerKey },
              minZoom: minZoom,
              maxZoom: maxZoom
            });
          } else {
            // Vector layer initialized
            layer = new VectorLayer({
              source: createGeoServerVectorSource(layerKey),
              style: styleFunc,
              properties: { id: layerKey },
              minZoom: minZoom,
              maxZoom: maxZoom
            });
          }
          layerRefs.current[layerKey] = layer;
          const endTime = performance.now();
          setLastLayerLoadTime(endTime - startTime); // Track layer cold initialization lag
        } else {
          // Dynamic style updates for live vector filtering rules
          if (layer instanceof VectorLayer) {
            layer.setStyle(styleFunc);
          }
        }
        
        if (!activeLayers.includes(layer)) {
          map.addLayer(layer);
        }
      } else {
        if (layer && activeLayers.includes(layer)) {
          map.removeLayer(layer);
        }
      }
    };

    // 5. State Boundary (Category A WMS Layer)
    syncMapLayer("state_boundary", isStateBoundaryVisible, "wms");

    // 4. District Polygons (Category A WMS Layer)
    syncMapLayer("district_boundary", isDistrictBoundaryVisible, "wms");

    // 2. Custom Ground Water Nodes (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("cgwb_data", isCGWBLayerVisible, "wms");

    // 11. River Network (Category A WMS Layer)
    syncMapLayer("river_network", isRiverNetworkVisible, "wms");

    // 1. Gauge Stations (Category A WMS Layer)
    syncMapLayer("wetland", isWetlandVisible, "wms");

    // 3. Waterbodies (Category A WMS Layer)
    syncMapLayer("waterbodies_amrut", isWaterbodiesAmrutVisible, "wms");

    // 6. Major River Streams (Category A WMS Layer)
    syncMapLayer("ward_boundary", isWardBoundaryVisible, "wms");

    // 7. Basin Delineation (Category A WMS Layer)
    syncMapLayer("state_highway", isStateHighwayVisible, "wms");

    // 8. Aquifer Zones (Category A WMS Layer)
    syncMapLayer("soil_texture", isSoilTextureVisible, "wms");

    // 9. Rainfall Grid (Category A WMS Layer)
    syncMapLayer("revenue_circle", isRevenueCircleVisible, "wms");

    // 10. CGWB Groundwater Nodes (Category A WMS Layer)
    syncMapLayer("reserve_forests", isReserveForestsVisible, "wms");
    
    // PWD Landmark (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("pwd_landmark", isPwdLandmarkVisible, "wms", 10);

    // Protected Areas (Category A WMS Layer)
    syncMapLayer("protected_areas", isProtectedAreasVisible, "wms");

    // Bridge Points (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("bridge_points", isBridgePointsVisible, "wms");

    // RTDAS Gauge points (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("rtdas", isRtdasVisible, "wms");

    // NHP RTDAS points (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("nhp_rtdas", isNhpRtdasVisible, "wms");

    // Basin Boundary (Category A WMS Layer)
    syncMapLayer("basin_boundary", isBasinBoundaryVisible, "wms");

    // Embankment Lines (Category A WMS Layer)
    syncMapLayer("embankment", isEmbankmentVisible, "wms");

    // Sluice Gates (WMS Layer - obtaining styling from GeoServer)
    syncMapLayer("sluice_gates", isSluiceGatesVisible, "wms");

    // LULC Grid (Category A WMS Layer, complex raster-vector polygons)
    syncMapLayer("lulc", isLULCLayerVisible, "wms");

    // 13. Flood Inundation Years (Category A WMS Layer, Year specific)
    const floodYears = ["2024", "2023", "2022", "2021", "2020"];
    console.log(`[Diagnostic] Flood Layer Status - isFloodLayersVisible: ${isFloodLayersVisible}, selectedFloodYear: ${selectedFloodYear}`);
    
    // Print comprehensive diagnostics for every flood layer (Phase 5 GeoServer Extent & Zoom validation)
    floodYears.forEach((yr) => {
      const resolvedLayerKey = `flood_layer_${yr}`;
      const isVisible = !!isFloodLayersVisible && (selectedFloodYear === yr);
      
      console.log(`[Diagnostic] --- FLOOD LAYER CONFIGURATION AUDIT: ${resolvedLayerKey} ---`);
      console.log(`[Diagnostic] Layer Name: ${resolvedLayerKey}`);
      console.log(`[Diagnostic] Source Type: TileWMS (OpenLayers)`);
      console.log(`[Diagnostic] TileWMS URL: /api/geoserver/wms`);
      console.log(`[Diagnostic] Workspace: ${GEOSERVER_WORKSPACE}`);
      console.log(`[Diagnostic] Extent: Default OpenLayers View Bounds (Assam envelope matching EPSG:3857)`);
      console.log(`[Diagnostic] Projection: EPSG:3857 (Web Mercator)`);
      console.log(`[Diagnostic] Visibility Constraints: None (Fully delegated to authoritative GeoServer scale SLD)`);
      console.log(`[Diagnostic] Min Zoom: Undefined (Unconstrained)`);
      console.log(`[Diagnostic] Max Zoom: Undefined (Unconstrained)`);
      console.log(`[Diagnostic] Active State: ${isVisible ? "VISIBLE (ACTIVE ON MAP)" : "HIDDEN"}`);
      console.log(`[Diagnostic] WMS Parameter Symmetries (Comparing to flood_layer_2023):`);
      console.log(`[Diagnostic]   - URL: /api/geoserver/wms (IDENTICAL)`);
      console.log(`[Diagnostic]   - TILED: true (IDENTICAL)`);
      console.log(`[Diagnostic]   - VERSION: 1.1.1 (IDENTICAL)`);
      console.log(`[Diagnostic]   - Server Type: geoserver (IDENTICAL)`);
      console.log(`[Diagnostic]   - Cross Origin: anonymous (IDENTICAL)`);
      console.log(`[Diagnostic] ----------------------------------------------------`);

      syncMapLayer(resolvedLayerKey, isVisible, "wms");
    });

  }, [
    isStateBoundaryVisible, isDistrictBoundaryVisible, isCGWBLayerVisible, isRiverNetworkVisible, isWetlandVisible, isWaterbodiesAmrutVisible,isWardBoundaryVisible, isStateHighwayVisible, isSoilTextureVisible,isRevenueCircleVisible, isReserveForestsVisible, isProtectedAreasVisible, isPwdLandmarkVisible, isBridgePointsVisible, isRtdasVisible, isNhpRtdasVisible, isEmbankmentVisible, isSluiceGatesVisible,isBasinBoundaryVisible, isLULCLayerVisible, activeFilterField, activeFilterValue, selectedFloodYear, isFloodLayersVisible
  ]);

  // Sync features list, available fields, unique values and matching counters
  useEffect(() => {
    let total = 0;
    let visible = 0;
    const fieldsSet = new Set<string>();
    const valuesSet = new Set<string>();

    const activeLayers = [
      { layer: layerRefs.current.state_boundary, isVisible: isStateBoundaryVisible },
      { layer: layerRefs.current.district_boundary, isVisible: isDistrictBoundaryVisible },
      { layer: layerRefs.current.cgwb_data, isVisible: isCGWBLayerVisible },
      { layer: layerRefs.current.river_network, isVisible: isRiverNetworkVisible },
      { layer: layerRefs.current.wetland, isVisible: isWetlandVisible },
      { layer: layerRefs.current.waterbodies_amrut, isVisible: isWaterbodiesAmrutVisible },
      { layer: layerRefs.current.ward_boundary, isVisible: isWardBoundaryVisible },
      { layer: layerRefs.current.state_highway, isVisible: isStateHighwayVisible },
      { layer: layerRefs.current.soil_texture, isVisible: !!isSoilTextureVisible },
      { layer: layerRefs.current.revenue_circle, isVisible: isRevenueCircleVisible },
      { layer: layerRefs.current.reserve_forests, isVisible: isReserveForestsVisible },
      { layer: layerRefs.current.protected_areas, isVisible: isProtectedAreasVisible },
      { layer: layerRefs.current.pwd_landmark, isVisible: isPwdLandmarkVisible },
      { layer: layerRefs.current.bridge_points, isVisible: isBridgePointsVisible },
      { layer: layerRefs.current.rtdas, isVisible: isRtdasVisible },
      { layer: layerRefs.current.nhp_rtdas, isVisible: isNhpRtdasVisible }, 
      { layer: layerRefs.current.embankment, isVisible: isEmbankmentVisible },
      { layer: layerRefs.current.sluice_gates, isVisible: isSluiceGatesVisible },
      { layer: layerRefs.current.basin_boundary, isVisible: isBasinBoundaryVisible },
      { layer: layerRefs.current.lulc, isVisible: isLULCLayerVisible },
      ...["2024", "2023", "2022", "2021", "2020"].map(yr => ({
        layer: layerRefs.current[`flood_layer_${yr}`],
        isVisible: !!isFloodLayersVisible && selectedFloodYear === yr
      }))
    ];

    activeLayers.forEach(({ layer, isVisible }) => {
      if (layer && isVisible && mapInstanceRef.current) {
        const source = (layer as any).getSource ? (layer as any).getSource() : null;
        const features = (source && typeof (source as any).getFeatures === "function") 
          ? (source as any).getFeatures() 
          : [];
        total += features.length;

        features.forEach(f => {
          const props = f.getProperties();
          Object.keys(props).forEach(key => {
            if (key !== "geometry" && key !== "boundedBy" && key !== "bbox" && key !== "layer_id") {
              fieldsSet.add(key);
            }
          });

          // Test filter match
          let matched = true;
          if (activeFilterField && activeFilterValue) {
            const val = f.get(activeFilterField);
            if (val === undefined || String(val) !== activeFilterValue) {
              matched = false;
            }
          }
          if (matched) {
            visible++;
          }

          // Fetch unique parameters for dropdown
          if (activeFilterField) {
            const val = f.get(activeFilterField);
            if (val !== undefined && val !== null && val !== "") {
              valuesSet.add(String(val));
            }
          }
        });
      }
    });

    setAvailableFields(Array.from(fieldsSet).sort());
    setUniqueValues(Array.from(valuesSet).sort());
    setCounts({ totalBeforeFilter: total, visibleAfterFilter: visible });

    // Trigger layer redraw
    activeLayers.forEach(({ layer }) => {
      layer?.changed();
    });
  }, [
    isStateBoundaryVisible, isDistrictBoundaryVisible, isCGWBLayerVisible, isRiverNetworkVisible, isWetlandVisible, isWaterbodiesAmrutVisible,isWardBoundaryVisible, isStateHighwayVisible, isSoilTextureVisible,isRevenueCircleVisible, isReserveForestsVisible, isProtectedAreasVisible, isPwdLandmarkVisible, isBridgePointsVisible, isEmbankmentVisible, isSluiceGatesVisible, isBasinBoundaryVisible, isRtdasVisible, isNhpRtdasVisible, isFloodLayersVisible, selectedFloodYear, activeFilterField, activeFilterValue, isLULCLayerVisible
  ]);
 // Synchronous features load listener
  useEffect(() => {
    const triggerRedraw = () => {
      Object.values(layerRefs.current).forEach(layer => {
        layer?.changed();
      });
    };

    const sources = Object.values(layerRefs.current)
      .map(layer => (layer as any)?.getSource())
      .filter((src): src is any => src && typeof src.on === "function" && typeof (src as any).getFeatures === "function");

    sources.forEach(src => {
      src.on("change", triggerRedraw);
    });

    return () => {
      sources.forEach(src => {
        src.un("change", triggerRedraw);
      });
    };
  }, []);

  return (
    <div id="map-root" ref={mapElement} className="w-full h-full min-h-[400px] relative">
      {/* HTML Popup Container */}
      <div 
        ref={popupElement} 
        className="absolute bg-white shadow-2xl rounded-2xl border border-gray-100 transition-all pointer-events-auto z-[1000]"
        style={{ display: "none" }}
      ></div>

      {/* FILTER BUTTON & FLOATING CONTROLLER AREA (ON THE MAP) */}
      <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`px-3 py-2 bg-white dark:bg-slate-900 shadow-lg rounded-xl flex items-center gap-1.5 border border-blue-50 dark:border-slate-800 hover:scale-[1.03] transition-all text-[11px] font-bold leading-none ${isFilterOpen ? 'text-primary-blue dark:text-cyan-400' : 'text-gray-600 dark:text-slate-300'}`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Attribute Filter</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>

        {isFilterOpen && (
          <div className="w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-blue-50/55 dark:border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-4 duration-250">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2.5">
              <span className="text-[10px] font-black text-primary-blue dark:text-cyan-400 uppercase tracking-widest leading-none">Dynamic Query Console</span>
              <button 
                onClick={() => {
                  setActiveFilterField("");
                  setActiveFilterValue("");
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 dark:text-slate-500 transition-colors"
                title="Reset active query filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="flex flex-col">
                <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Database className="w-3 h-3" /> Select Attribute Field
                </label>
                <select
                  value={activeFilterField}
                  onChange={(e) => {
                    setActiveFilterField(e.target.value);
                    setActiveFilterValue(""); // Reset selection value
                  }}
                  className="w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-1 focus:ring-primary-blue dark:focus:ring-cyan-400 rounded-lg px-3 py-2 text-gray-700 dark:text-slate-200"
                >
                  <option value="">-- No Attribute Selected --</option>
                  {availableFields.map(field => (
                    <option key={field} value={field}>{field.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>

              {activeFilterField && (
                <div className="flex flex-col animate-in fade-in duration-200">
                  <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Eye className="w-3 h-3" /> Select Filter Value
                  </label>
                  <select
                    value={activeFilterValue}
                    onChange={(e) => setActiveFilterValue(e.target.value)}
                    className="w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-1 focus:ring-primary-blue dark:focus:ring-cyan-400 rounded-lg px-3 py-2 text-gray-700 dark:text-slate-200"
                  >
                    <option value="">-- All (No Filter) --</option>
                    {uniqueValues.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
              <span className="text-gray-400 dark:text-slate-500 font-bold">Query Status:</span>
              <span className={`font-black uppercase tracking-wider ${activeFilterField && activeFilterValue ? 'text-green-500 animate-pulse' : 'text-gray-400'}`}>
                {activeFilterField && activeFilterValue ? 'Active Filter' : 'Show All'}
              </span>
            </div>
          </div>
        )}
      </div>



              {/* BASEMAP KEY CONTROL SELECTOR OVERLAY (ON THE MAP - TOP-RIGHT) */}
      <div className="absolute top-6 right-[64px] z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsBasemapOpen(!isBasemapOpen)}
          className={`px-3 py-2 bg-white dark:bg-slate-900 shadow-lg rounded-xl flex items-center gap-1.5 border border-blue-50 dark:border-slate-800 hover:scale-[1.03] transition-all text-[11px] font-bold leading-none ${isBasemapOpen ? 'text-primary-blue dark:text-cyan-400' : 'text-gray-600 dark:text-slate-300'}`}
        >
          <Layers className="w-3.5 h-3.5 text-primary-blue dark:text-cyan-400" />
          <span>Select Basemap</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${isBasemapOpen ? 'rotate-180' : ''}`} />
        </button>

        {isBasemapOpen && (
          <div className="w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 rounded-xl shadow-2xl border border-blue-50/55 dark:border-slate-800 space-y-1 animate-in fade-in slide-in-from-top-4 duration-250 pointer-events-auto">
            <span className="text-[8px] font-black text-[#00376c] dark:text-cyan-400 uppercase tracking-widest leading-none px-2 py-1 block">Select Canvas Map</span>
            
            <button
              onClick={() => {
                setBasemapType("osm");
                setIsBasemapOpen(false);
              }}
              className={`w-full text-left font-bold text-[10px] px-2 py-1.5 rounded-lg transition-all flex items-center justify-between ${basemapType === 'osm' ? 'bg-primary-blue/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400' : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200'}`}
            >
              <div className="flex flex-col">
                <span className="leading-snug text-[10px]">Standard Streets</span>
                <span className="text-[7.5px] opacity-70 font-normal leading-none mt-0.5">OpenStreetMap Default</span>
              </div>
              {basemapType === "osm" && <Check className="w-3 h-3 text-primary-blue dark:text-cyan-400 font-extrabold" />}
            </button>

            <button
              onClick={() => {
                setBasemapType("satellite");
                setIsBasemapOpen(false);
              }}
              className={`w-full text-left font-bold text-[10px] px-2 py-1.5 rounded-lg transition-all flex items-center justify-between ${basemapType === 'satellite' ? 'bg-primary-blue/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400' : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200'}`}
            >
              <div className="flex flex-col">
                <span className="leading-snug text-[10px]">Satellite Ortho</span>
                <span className="text-[7.5px] opacity-70 font-normal leading-none mt-0.5">Esri Global Imagery</span>
              </div>
              {basemapType === "satellite" && <Check className="w-3 h-3 text-primary-blue dark:text-cyan-400 font-extrabold" />}
            </button>

            <button
              onClick={() => {
                setBasemapType("light");
                setIsBasemapOpen(false);
              }}
              className={`w-full text-left font-bold text-[10px] px-2 py-1.5 rounded-lg transition-all flex items-center justify-between ${basemapType === 'light' ? 'bg-primary-blue/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400' : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200'}`}
            >
              <div className="flex flex-col">
                <span className="leading-snug text-[10px]">Light Modern</span>
                <span className="text-[7.5px] opacity-70 font-normal leading-none mt-0.5">CartoDB Positron Canvas</span>
              </div>
              {basemapType === "light" && <Check className="w-3 h-3 text-primary-blue dark:text-cyan-400 font-extrabold" />}
            </button>

            <button
              onClick={() => {
                setBasemapType("dark");
                setIsBasemapOpen(false);
              }}
              className={`w-full text-left font-bold text-[10px] px-2 py-1.5 rounded-lg transition-all flex items-center justify-between ${basemapType === 'dark' ? 'bg-primary-blue/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400' : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200'}`}
            >
              <div className="flex flex-col">
                <span className="leading-snug text-[10px]">Dark Matter</span>
                <span className="text-[7.5px] opacity-70 font-normal leading-none mt-0.5">CartoDB Elegant Black</span>
              </div>
              {basemapType === "dark" && <Check className="w-3 h-3 text-primary-blue dark:text-cyan-400 font-extrabold" />}
            </button>
          </div>
        )}
      </div>



      {/* Legend container */}
      <div className="absolute bottom-[50px] left-6 z-30 flex flex-col items-start gap-2.5 w-[260px] sm:w-[300px] pointer-events-none">
        {/* Dynamic Legend Over Map */}
        <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl shadow-2xl border border-gray-200/60 dark:border-slate-800 pointer-events-auto transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#00376c] dark:text-cyan-400">Map Legend</span>
            <span className="px-1.5 py-0.5 text-[8px] font-black rounded-full bg-blue-50 dark:bg-slate-850 border border-blue-100/30 dark:border-slate-800 text-[#00376c] dark:text-cyan-400">
              {activeLayers.length} Active
            </span>
          </div>
          
          {activeLayers.length === 0 ? (
            <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider text-center py-3 bg-gray-50/50 dark:bg-slate-950/40 rounded-lg border border-dashed border-gray-200 dark:border-slate-850">
               No selected layers
            </p>
          ) : (
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
              {activeLayers.map((layer) => (
                 <div key={layer.id} className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 rounded-md bg-gray-50/50 dark:bg-slate-950/50 border border-gray-100/80 dark:border-slate-850 text-[10.5px] font-bold text-gray-700 dark:text-slate-300">
                    <span className="truncate">{layer.name}</span>
                  </div>
                  
                  {/* Reusable GeoServer GetLegendGraphic visual image request */}
                  <div className="pl-3 pr-1 py-1.5 border-l-2 border-primary-blue/30 dark:border-cyan-500/30 ml-2 mt-1 mb-2 select-none bg-slate-50/30 dark:bg-slate-950/20 rounded-r-lg max-h-40 overflow-y-auto">
                    <img 
                      src={`/api/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layer.id}&TRANSPARENT=true&legend_options=fontAntiAliasing:true;fontSize:9;fontName:system-ui;fontColor:0x334155`}
                      alt={`${layer.name} Legend`}
                      className="max-w-full h-auto dark:invert dark:hue-rotate-180"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // If load fails, hide image gracefully
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div> 
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GEOSPATIAL STATUS BAR: DYNAMIC LON/LAT IN DECIMAL DEGREES & COHESIVE SCALE METRIC */}
      <div 
        id="gis-status-bar"
        className="absolute bottom-0 left-0 right-0 h-9 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-gray-100 dark:text-slate-300 border-t border-gray-200 dark:border-slate-800/80 px-4 md:px-6 flex items-center justify-between z-40 select-none font-mono text-[9px]"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-450 dark:text-slate-450 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-primary-blue dark:text-cyan-400" />
            <span className="font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Coordinates:</span>
          </div>
          {hoverCoords ? (
            <div className="flex items-center gap-3 text-gray-800 dark:text-white">
              <div>
                <span className="text-gray-400 dark:text-slate-500 mr-1 font-bold">LAT:</span> 
                <span className="font-extrabold text-primary-blue dark:text-cyan-400">{hoverCoords.lat.toFixed(6)}° N</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-slate-700"></div>
              <div>
                <span className="text-gray-400 dark:text-slate-500 mr-1 font-bold">LON:</span> 
                <span className="font-extrabold text-primary-blue dark:text-cyan-400">{hoverCoords.lon.toFixed(6)}° E</span>
              </div>
            </div>
          ) : (
            <span className="text-gray-450 dark:text-slate-550 italic text-[8.5px]">Move cursor over map to display live coordinates</span>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-primary-blue dark:text-cyan-400" />
            <span className="font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Map Scale:</span>
            <span className="font-extrabold text-primary-blue dark:text-cyan-400 bg-gray-100 dark:bg-slate-900/60 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-800/80">
              1 : {currentScale > 0 ? currentScale.toLocaleString() : "---"}
            </span>
          </div>
        </div>

        {/* STATUS BAR METRICS SECTION REMOVED PER USER REQ */}
      </div>

      {/* GEOSERVER CONNECTION STATUS MONITOR BADGE */}
      <div className="absolute bottom-[50px] right-6 z-30 flex items-center gap-2">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/90 dark:bg-slate-950/95 text-white rounded-full shadow-2xl backdrop-blur-md border border-slate-800/80 text-[10px] font-bold tracking-widest uppercase group relative cursor-help select-none">
          <div className={`w-2 h-2 rounded-full ${geoServerErrors.length > 0 ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`}></div>
          <span className="font-mono text-[9px] font-bold tracking-[0.15em]">
            GeoServer: {geoServerErrors.length > 0 ? "Connection Error" : "Online"}
          </span>
          
          {/* Elegant descriptive hover tooltip */}
          <div className="absolute bottom-11 right-0 w-80 p-5 bg-slate-950/98 rounded-2xl border border-slate-800 text-slate-300 shadow-2xl transition-all duration-300 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 pointer-events-none translate-y-2 group-hover:translate-y-0 text-[11px] normal-case tracking-normal">
            <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-2.5 text-cyan-400">Local Connection Monitor</div>
            <p className="text-slate-400 mb-3 leading-relaxed">
              The application is configured to stream live geographic layers from your local PostGIS / GeoServer instance at <code className="text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded font-mono text-[10px]">http://localhost:8080</code>.
            </p>
            {geoServerErrors.length > 0 && (
              <div className="space-y-2 pt-2.5 border-t border-slate-800">
                <div className="text-[9px] font-black uppercase text-red-400 tracking-wider">Failed to reach GeoServer for layers:</div>
                <div className="flex flex-wrap gap-1">
                  {geoServerErrors.map(layer => (
                    <span key={layer} className="px-1.5 py-0.5 bg-slate-900 border border-slate-850 rounded font-mono text-[9px] font-bold text-red-300">{layer}</span>
                  ))}
                </div>
                <p className="text-[9px] text-slate-500 leading-normal mt-1 italic">
                  *Note: Browser sandbox preview cannot reach your desktop local host directly without CORS enabled or running the app locally.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
