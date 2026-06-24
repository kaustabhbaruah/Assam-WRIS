# 🗺️ GeoServer-driven WMS/WFS Architecture & Spatial Layers Manual

This manual provides a zero-leak, high-performance architectural manual detailing how the AssamWRIS portal integrates and renders spatial layers. It outlines the transition from client-side vector styling to **Server-Side GeoServer SLD Cartography** with real-time **Dynamic Legends** powered by standard OGC WMS queries.

---

## 🏗️ System Architecture & End-to-End Data Flow

The portal employs a secure, low-latency, full-stack proxy architecture. Direct exposure of administrative credentials or GeoServer ports (such as `8080`) to the browser is strictly forbidden. 

```
                                      [ CLIENT BROWSER iFRAME ]
                                                  |
                         (Dynamic UI Events)      | (Direct Tile/Feature Calls)
                                  |               v
                                  |   +---------------------------------------+
                                  |   |        Interactive GIS Map            |
                                  |   |   - OpenLayers WMS Tile Layer         |
                                  |   |   - Dynamic Legend (GetLegendGraphic) |
                                  |   +---------------------------------------+
                                  |                       |
                                  v                       |
+---------------------------------------------------+     | (Proxied WMS / GetFeatureInfo)
|             User Control Toolbox UI               |     |
|   - Toggle Sidebar Layer Checkboxes               |     |
|   - Select Flood Year Inundation Dropdown          |     v
+---------------------------------------------------+   +---------------------------------------+
                                  |                     |     Secure Server-Side API Proxy      |
                                  +-------------------> |     - Web Map Service (WMS) Proxy     |
                                    (State Stream)      |     - Web Feature Service (WFS) Proxy |
                                                        +---------------------------------------+
                                                                            |
                                                                            | (Basic Auth + Env Resolved)
                                                                            v
                                                        +---------------------------------------+
                                                        |        GeoServer / PostGIS Engine     |
                                                        |  - Raster Tile Layer Builder          |
                                                        |  - OGC Standard Stylers (SLD files)  |
                                                        |  - PostgreSQL/PostGIS Db Store        |
                                                        +---------------------------------------+
```

### Flow Lifecycle
1. **Request Trigger:** The React client user toggles a map layer (e.g., *Soil Texture*). The state variable updates, compiling into `activeLayers`.
2. **Standard OGC Imagery Call:** OpenLayers fires a TileWMS image request targeting `/api/geoserver/wms`. 
3. **Proxy Node Resolution:** The Next.js API router intercepts the request, reads secret variables (usernames, passwords, workspaces), dynamically resolves the layer ID to its published GeoServer typename, appends basic authorization headers, and forwards the streamlined call to GeoServer.
4. **SLD Raster Generation:** GeoServer queries PostgreSQL/PostGIS for the spatial geometry coordinates, processes the raw attributes against the catalog **Style Layer Descriptor (SLD) XML** rules, renders a static, compressed visual PNG tile, and streams it back via the API proxy.
5. **Tile Display & Dynamic Legend:** The client displays the tile and calls `GetLegendGraphic` using the exact same layer ID to render an on-the-fly, high-integrity spatial map legend.

---

## 🗄️ Spatial Layer Registry & Mapping Table

This table documents the primary active GIS layers, their front-end identifier IDs, and how they resolve internally on the server proxy:

| Layer Category. | Layer ID (Front-end) | Resolved GeoServer Typename | Default Geometry | Graphic Style Descriptor (SLD) |
| :--- | :--- | :--- | :--- | :--- |
| **Administrative** | `state_boundary` | `assam:state_boundary` | Polygon | Solid boundary outline theme, transparent fill |
| **Administrative** | `district_boundary` | `assam:district_boundary` | Polygon | Light transparent pastel fills, dark borders |
| **Administrative** | `revenue_circle` | `assam:revenue_circle` | Polygon | Boundary tracking division layer |
| **Administrative** | `ward_boundary` | `assam:ward_boundary` | Polygon | High-detail municipal perimeter layout |
| **Administrative** | `basin_boundary` | `assam:basin_boundary` | Polygon | Soft blue-gray watershed boundaries |
| **Hydrology** | `river_network` | `assam:river_network` | LineString | Dual-line watercourse track styling |
| **Hydrology** | `wetland` | `assam:wetland` | Polygon | Green marshland symbolizers |
| **Hydrology** | `waterbodies_amrut` | `assam:waterbodies_amrut` | Polygon | Deep freshwater blue pool fill lines |
| **Water Resources** | `cgwb_data` | `assam:cgwb_data` | Point | Groundwater test dug well indicators |
| **Infrastructure** | `state_highway` | `assam:state_highway` | LineString | Double solid orange/highway road segments |
| **Hydrology** | `embankment` | `assam:embankment` | LineString | Segmented orange embankment barriers |
| **Hydrology** | `sluice_gates` | `assam:sluice_gates` | Point | Green-filled circle sluice point icons |
| **Infrastructure** | `pwd_landmark` | `assam:pwd_landmark`| Point | Hot pink point indicator symbols |
| **Infrastructure** | `bridge_points` | `assam:bridge_points` | Point | Amber-yellow diamond bridge markers |
| **Monitoring** | `rtdas` | `assam:rtdas` | Point | Teal real-time telemetry gauge points |
| **Monitoring** | `nhp_rtdas` | `assam:nhp_rtdas` | Point | Indigo telemetry network nodes |
| **Land Resources**| `soil_texture` | `assam:soil_texture` | Polygon | Categorized styling (Sandy, Clayey, Loamy) |
| **Land Resources**| `lulc` | `assam:lulc` | Polygon | Land Use Land Cover (Forest, Agri, Urban) |
| **Inundation** | `flood_layer_2024`| `assam:flood_layer_2024`| Polygon | Transparent cyan flood vector overlay |
| **Inundation** | `flood_layer_2023`| `assam:flood_layer_2023`| Polygon | Transparent cyan flood vector overlay |
| **Inundation** | `flood_layer_2022`| `assam:flood_layer_2022`| Polygon | Transparent cyan flood vector overlay |
| **Inundation** | `flood_layer_2021`| `assam:flood_layer_2021`| Polygon | Transparent cyan flood vector overlay |
| **Inundation** | `flood_layer_2020`| `assam:flood_layer_2020`| Polygon | Transparent cyan flood vector overlay |

---

## 🎨 Complete GeoServer SLD-driven Styling

Every operational GIS layer listed above is styled entirely server-side using **OGC Style Layer Descriptor (SLD)** XML files cataloged on the GeoServer instance. Hardcoding cartographical guidelines (colors, stroke weights, fills) on the React frontend is strictly prohibited. 

### Why SLD-driven?
- **Extreme Performance:** Eliminates massive calculations and CPU-intensive SVG render loops.
- **Portability:** Decoupled styles can be consumed by external enterprise clients via QGIS, ArcGIS, or WMTS clients immediately.
- **Dynamic Legends:** Calling `GetLegendGraphic` reads active symbols in the SLD and generates pristine legendary representations automatically.

### What Remains on the Frontend?
The front-end is ONLY responsible for ephemeral user interaction states:
1. **Feature Hover Highlight:** Vector stroke adjustments on spatial selections.
2. **Active Feature Selection:** Highlights queried geometries on map clicks.
3. **Search Results Overlay:** Focus marker overlay on location coordinates.
4. **Drawing Tool Overlays:** Measurement paths, geometric shapes, or editing guide paths when drafting new bounds.

---

## 🗺️ Unified Interactive Flood Inundation Module

To ensure high-fidelity spatial telemetry, the frontend exposes a single, unified interactive controls card for historical model datasets:

- **UI Exposure:** A standalone **Flood Inundation Map** checkbox which expands with a **Select Flood Year Dropdown** containing values: `2024`, `2023`, `2022`, `2021`, `2020`.
- **Exclusive Visibility Flow:** When the checkbox is flagged, OpenLayers initiates a WMS layer matching `flood_layer_${selectedFloodYear}`. Only one year displays at any time on the map.
- **Direct Variable Mapping:** If the user toggles the dropdown, the previous active year's layer is cleanly removed, and the new target year's layer takes its place. 
- **Auto diagnostic feedback:** Real-time console logs capture change triggers and log layer status variables.

---

## 📈 Dynamic Legend System (GetLegendGraphic)

The legends pane on the bottom-left corner of the map renders dynamically based on enabled layers:
- **No hardcoded taxonomy grids:** The frontend has zero knowledge of layer colors.
- **WMS Integration:** When a layer is toggled `ON`, an dynamic Legend element compiles with an `<img />` fetching:
  ```
  /api/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layer.id}&TRANSPARENT=true&legend_options=fontAntiAliasing:true;fontSize:9;fontName:system-ui;fontColor:0x334155
  ```
- **Dark Theme Compatibility:** MapComponent utilizes a standard CSS inversion loop (`dark:invert dark:hue-rotate-180`) on the retrieved PNGs to smoothly adapt text labels and symbols to the active slate theme variables automatically.

---

## 📝 Developer Tutorial: Registering, Publishing, and Styling a New Layer

Follow this walkthrough to import, publish, style, and expose a raw spatial dataset as a new map layer:

### Step 1: Upload Data into PostGIS
1. Log into your clean PostgreSQL database instance:
   ```bash
   psql -U username -d wris_postgres
   ```
2. Enable PostGIS extensions if not already installed:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```
3. Import your shapefile coordinates into database tables using standard CLI loaders (e.g., `shp2pgsql`):
   ```bash
   shp2pgsql -s 4326 -I community_forests.shp public.community_forests | psql -U username -d wris_postgres
   ```

### Step 2: Register & Publish on GeoServer
1. Access your web control interface (usually at port `8080/geoserver` or on secure backends).
2. Create a Workspace (e.g., `assam`) and connect a Data Store targeting your SQL instance (`wris_postgres`).
3. Click "Layers" -> "Add a new resource" -> select your store.
4. Choose `community_forests`, click **Publish**.
5. Under "Coordinate Reference Systems", define:
   - **Declared SRS:** `EPSG:4326` (WGS 84)
   - **SRS Handling:** `Force declared`
6. Click **Compute from data** to generate the geometric bounding boxes.

### Step 3: Design & Associate an SLD Style
1. Draft your OGC Style XML structure (e.g., `community_forests.sld`):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld">
     <NamedLayer>
       <Name>community_forests</Name>
       <UserStyle>
         <FeatureTypeStyle>
           <Rule>
             <Title>Preserved Greenlands</Title>
             <PolygonSymbolizer>
               <Fill>
                 <CssParameter name="fill">#2e7d32</CssParameter>
                 <CssParameter name="fill-opacity">0.7</CssParameter>
               </Fill>
               <Stroke>
                 <CssParameter name="stroke">#1b5e20</CssParameter>
                 <CssParameter name="stroke-width">1</CssParameter>
               </Stroke>
             </PolygonSymbolizer>
           </Rule>
         </FeatureTypeStyle>
       </UserStyle>
     </NamedLayer>
   </StyledLayerDescriptor>
   ```
2. Go to "Styles" on GeoServer -> click "Add new style" -> upload file -> select your Workspace -> click **Submit**.
3. Re-open your `community_forests` layer configuration page, click "Publish" tab, locate WMS style settings, set the newly uploaded style as **Default Style**, and click **Save**.

### Step 4: Expose Layer in the Web Client
1. Register metadata parameters inside `/src/constants/layers.ts`:
   ```typescript
   {
     id: "community_forests",
     name: "Community Forests",
     typename: "community_forests",
     type: "Polygon",
     category: "Soil", // Groups under Soil/Environment category
     description: "Local communal and preserved woodland assets across rural zones.",
     source: "Govt Forestry Department"
   }
   ```
2. Open `/src/app/explorer/page.tsx`:
   - Declare the visibility state hook:
     ```typescript
     const [showCommunityForests, setShowCommunityForests] = useState(false);
     ```
   - Register inside `activeLayers` useMemo list:
     ```typescript
     if (showCommunityForests) {
       layers.push({ id: 'community_forests', name: 'Community Forests', color: '#2e7d32', type: 'Polygon' });
     }
     ```
   - Feed the visibility prop to the map element:
     ```tsx
     <MapComponent isCommunityForestsVisible={showCommunityForests} />
     ```
   - Add toggle box element to the Soil category Sidebar list:
     ```tsx
     <SidebarItem 
       label="Community Forests" 
       checked={showCommunityForests} 
       onChange={(val: boolean) => setShowCommunityForests(val)} 
     />
     ```
3. Open `/src/components/MapComponent.tsx`:
   - Declare prop under `MapComponentProps`:
     ```typescript
     isCommunityForestsVisible?: boolean;
     ```
   - Add variable track to `layerRefs.current` initialization mapping:
     ```typescript
     community_forests: null,
     ```
   - Sync parameters inside the `visibilityPropsRef` effect hooks and dependency lists:
     ```typescript
     community_forests: isCommunityForestsVisible,
     ```
   - Sync layer on render within the main map syncer effect loop:
     ```typescript
     syncMapLayer("community_forests", isCommunityForestsVisible, "wms");
     ```

Your new layer is now completely configured! It renders high-efficiency server tiles, reacts to clicks, updates coordinates dynamically, and retrieves standard dynamic symbology graphics automatically.

---

## 🛠️ Diagnostics & Troubleshooting Guidelines

Use this quick-start reference when diagnosing data layer issues:

### 1. Verification of WMS Requests
Open your browser inspector (F12) Network tab. Search for `/wms` queries:
- **Correct parameter check:** Confirm `LAYERS` matches the layout of `assam:layer_id`.
- **Query verification:** Clicking the map triggers GetFeatureInfo. Check:
  `LAYERS=assam:soil_texture&QUERY_LAYERS=assam:soil_texture`
- **Coordinate System alignment:** Confirm bounding box coordinates are formatted in Web Mercator metric bounds (`EPSG:3857`).

### 2. Common Errors
- **Error: `Parent directory path does not exist` or `Target content not found`:** Double check files are mapped relative to workspace root using ESM module pathings. Do not hardcode internal directory strings.
- **Error: `Missing or insufficient permissions`:** GeoServer catalog access restrictions might block requests. Verify raw URL with Basic Auth manually:
  `curl -u admin:geoserver http://localhost:8080/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities`
- **Error: Blank Tiles or Missing Layers:** Check layer bounds are compiled on GeoServer coordinate screens. Verify PostGIS tabular columns are fully indexed using standard GIST spacial index mappings.

---

## ⚡ Recommended Backend Optimizations

### 💾 PostgreSQL/PostGIS Tuning
1. **Spacial Indexing:** Add GIST indexes to polygon datasets immediately:
   ```sql
   CREATE INDEX idx_community_forests_geom ON community_forests USING gist(geom);
   ```
2. **Vacuum & Analyze:** Periodically re-index structural tables:
   ```sql
   VACUUM ANALYZE community_forests;
   ```

### 🏎️ GeoWebCache & Tile Caching
To slash response delays below 50ms:
- **GridSet alignment:** Map tiles using the standard global grid (`EPSG:900913` / `EPSG:3857`).
- **GWC Pre-Caching:** Open GeoServer Cache dashboard, select layer, choose "Seed/Truncate", zoom levels 1 to 14, and compute pre-cached coordinates. Subsequent client calls draw directly from pre-rendered GWC memory structures, completely bypassing slow dynamic SQL lookups.
