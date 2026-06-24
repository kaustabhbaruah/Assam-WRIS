# Assam Water Resources Information System (AssamWRIS)

A premium, high-performance geospatial data and water resources information platform built for the Water Resources Department, Govt. of Assam.

---

## 🏗️ Production Architecture & Core Stack

The AssamWRIS platform has migrated to a robust, enterprise-grade **GeoServer WMS/WFS Secure Proxy Architecture**:

1. **Enterprise Layout & State Syncing (React + Next.js App Router 15+):** Modular, highly responsive GIS Explorer interface designed for standard full-responsive desktop/mobile screen views, animated via `motion/react` (Framer Motion).
2. **Server-Side Security API Proxies (Next.js):** Client requests are proxied via server middleware nodes (`/api/geoserver/...`), hiding internal passwords, solving CORS constraints, and securing infrastructure ports safely on the server side.
3. **Decoupled OGC SLD Cartography:** No styling resides on the frontend! Visual rules are evaluated using XML-based **Style Layer Descriptor (SLD)** rules published on the GeoServer engine.
4. **Instant Dynamic Legends (GetLegendGraphic):** Active layers pull symbology on-the-fly from GeoServer's `GetLegendGraphic` stream, supporting dark theme micro-inversions automatically.
5. **Real-time Contact Support system:** Interactive email relay backend hosted at `/api/contact` using a real Nodemailer transporter integration.

---

## 🛠️ Environment Configuration (`.env`)

For production deployments, document your system keys in `.env` (or `.env.local` to override safely dev environments). See `.env.example` for details:

```env
# GeoServer Connection Settings
GEOSERVER_URL=http://localhost:8080/geoserver
GEOSERVER_WORKSPACE=assam
GEOSERVER_USER=admin
GEOSERVER_PASSWORD=geoserver

# Mail Server Configurations
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

---

## 📁 Spatial Layer Inventory & Assets (SLDs)

Production-ready OGC SLD schema assets are saved inside `/public/slds/` to easily configure server-side style classifications:
- **`soil_texture.sld`**: Categorized multi-rule Polygon symbolizer matching individual soil values (Sandy, Clayey, Loamy, Alluvial).
- **`lulc.sld`**: Land Use Land Cover classified symbolizer (Agriculture, Forest, Built-up, Wasteland, Waterbody).
- **`flood_layer.sld`**: Flood Inundation semi-transparent cyan layer mapped using dashed visual boundaries.

---

## 🗺️ Unified Historical Flood Inundation Layout

The GIS Explorer exposes historical flood inundation datasets via a unified visual controller:
- **Single UI Selector:** Users toggle the **Flood Inundation Map** checkbox which reveals an inline, elegant **Select Flood Year Dropdown** (`2024` - `2020`).
- **Mutual Exclusion Flow:** Only the selected year's layer (`flood_layer_${year}`) renders. Switching options instantly tears down the active tile and starts the new target layer request.
- **Diagnostic tracking:** Interactive console statements logging year selectors and resolved layer parameters verify that checking/unchecking and changing dropdown values generate the exact parameter payloads required:
  `LAYERS=assam:flood_layer_2024` & `QUERY_LAYERS=assam:flood_layer_2024`

---

## 📨 Secure Support Inquiry Backend System

The official contact support form and geographical coordinates information portal (under `/contact`) is fully connected to our nodemailer API:
- **Location:** Interactive forms live on `/src/app/contact/page.tsx` and submit payloads to `/api/contact/route.ts`.
- **Validation Pipeline:** Standard inputs (name, email format regex, empty checks, message lengths) are evaluated client-side before submission.
- **Submitting States:** Triggers loading spinners, disables inputs, records unique tracker references (`WRIS-######`), and slides in success panels.

---

## ⚡ Build, Test, and Compilation Commands

Ensure code validity prior to deploying updates or merging code with our staging pipelines:

1. **Development Server:** Bootstraps local environments on port 3000
   ```bash
   npm run dev
   ```
2. **Type check & Linter:** Verify syntax accuracy, unresolved imports, and React best practices:
   ```bash
   npm run lint
   ```
3. **Optimized Production compilation:** Build static resources and Server node modules:
   ```bash
   npm run build
   ```
   *Note: The NextJS App Router runs a full, standalone compiler optimizing hydration lag and code-splitting packages automatically.*
