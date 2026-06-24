"use client";

import { useState } from "react";
import { useUI } from "@/context/UIContext";
import { 
  FileText, 
  Download, 
  ExternalLink,
  Image as ImageIcon,
  BookOpen, 
  Maximize2, 
  X, 
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  Map
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  fileSize: string;
  category: string;
  fileUrl: string;
  badge: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  color: string;
  graphicType: "river" | "dots" | "bars" | "grid";
}

export default function ResourcesPage() {
  const { t } = useUI();
  const [activeTab, setActiveTab] = useState<"all" | "docs" | "gallery">("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Curated Technical documents including the critical NWDP Assam Brief
  const documents: DocumentItem[] = [
    {
      id: "nwdp-document",
      title: "National Water Development Programme (NWDP) Assam Brief",
      description: "Official comprehensive guide on raw water resource diversion channels, inter-basin linkage pipelines, and irrigation security grids under development in Assam.",
      publishDate: "June 2026",
      fileSize: "3.4 MB",
      category: "Programme Guidelines",
      fileUrl: "/docs/NWDP_Document.pdf",
      badge: "Featured Publication"
    },
    {
      id: "basin-mngmt",
      title: "State Hydrology & Decision Support Framework",
      description: "Mathematical models and stream routing procedures utilized in forecasting storm runoff parameters across the composite Brahmaputra catchment.",
      publishDate: "March 2026",
      fileSize: "12.8 MB",
      category: "Technical Report",
      fileUrl: "#",
      badge: "Core Model"
    },
    {
      id: "groundwater-aquifer",
      title: "Assam Multi-Tier Aquifer Hydrological Atlas",
      description: "Sub-surface exploratory logging reports defining high-yield alluvial aquifer boundary sheets and localized groundwater extraction coefficient tables.",
      publishDate: "December 2025",
      fileSize: "8.1 MB",
      category: "Data Catalog",
      fileUrl: "#",
      badge: "Groundwater Study"
    }
  ];

  // Gallery illustrations representing basin monitoring and geospatial surveys
  const galleryItems: GalleryItem[] = [
    {
      id: "satellite-brahmaputra",
      title: "Brahmaputra Sub-basin Satellite Mosaic",
      category: "Geospatial Remote Sensing",
      description: "Processed false-color infrared satellite composite illustrating vegetation index gradients and braided river morphology boundaries in Upper Assam during high water levels.",
      location: "Guwahati Reach, Assam",
      color: "from-cyan-900 to-emerald-950",
      graphicType: "river"
    },
    {
      id: "gauging-network-map",
      title: "Unified Hydrometeorological Gauging Grid",
      category: "Infrastructure Analytics",
      description: "Interactive visual spatial matrix mapping real-time satellite telemetry links and radar water level sensors operating across active river gauging divisions.",
      location: "Silchar Bridge sector",
      color: "from-[#001c3b] to-[#00376c]",
      graphicType: "dots"
    },
    {
      id: "catchment-elevation-dem",
      title: "Brahmaputra Basin Digital Elevation Profile",
      category: "Basin Geomorphology",
      description: "Topographic slope steepness matrix derived from satellite radar data, showing watershed basins and elevation flow direction networks.",
      location: "Brahmaputra Flood Plain",
      color: "from-blue-900 to-indigo-950",
      graphicType: "grid"
    },
    {
      id: "amrut-inundation-geometry",
      title: "AMRUT Action Inundation Geometry Plan",
      category: "District Flood Mitigation",
      description: "Calculated flood inundation depth grid representing structural retaining walls, municipal dikes, and gravity sluices mapped within metropolitan catchment zones.",
      location: "Metropolitan Guwahati Division",
      color: "from-sky-900 to-slate-900",
      graphicType: "bars"
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen pb-24">
      
      {/* HEADER HERO BANNER */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white dark:from-slate-950 dark:to-slate-900/60 pt-16 pb-12 px-6 md:px-12 border-b border-blue-100/50 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <span className="text-[10px] font-black tracking-[0.25em] text-primary-blue dark:text-cyan-400 uppercase bg-primary-blue/10 dark:bg-cyan-500/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Portal Resources
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#00376c] dark:text-white leading-tight">
            Resources & Publications
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mt-3 max-w-3xl font-medium leading-relaxed">
            Central repository of technical documentation, policy guidelines, spatial atlases, and high-resolution geospatial imagery of Assam's major water basins.
          </p>
        </div>
      </section>

      {/* PRIMARY CONTROLS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-5">
          {/* Section Filter Controls */}
          <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-xl border border-gray-200/50 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-800 text-[#00376c] dark:text-cyan-400 shadow"
                  : "text-gray-500 dark:text-slate-400 hover:text-[#00376c]"
              }`}
            >
              Unified View
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "docs"
                  ? "bg-white dark:bg-slate-800 text-[#00376c] dark:text-cyan-400 shadow"
                  : "text-gray-500 dark:text-slate-400 hover:text-[#00376c]"
              }`}
            >
              Technical Docs
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "gallery"
                  ? "bg-white dark:bg-slate-800 text-[#00376c] dark:text-cyan-400 shadow"
                  : "text-gray-500 dark:text-slate-400 hover:text-[#00376c]"
              }`}
            >
              Photo Gallery
            </button>
          </div>
          
          <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-black tracking-widest font-mono">
            State Water Informatics Centre • Hydro Informatics Unit
          </div>
        </div>
      </section>

      {/* CORE RESOURCES AREA */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <div className="space-y-16">
          
          {/* TAB 1: TECHNICAL DOCUMENTATION HUB */}
          {(activeTab === "all" || activeTab === "docs") && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#00376c]/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#00376c] dark:text-white tracking-tight">Technical Publications & Briefs</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Program guidelines and spatial research documents published by the HIU.</p>
                </div>
              </div>

              {/* Document Deck Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {documents.map((doc) => {
                  const isNwdp = doc.id === "nwdp-document";
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`relative bg-white dark:bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all duration-200 group hover:shadow-md ${
                        isNwdp 
                          ? "border-amber-300 dark:border-cyan-500/50 ring-2 ring-amber-400/10 dark:ring-cyan-400/10" 
                          : "border-gray-150 dark:border-slate-800"
                      }`}
                    >
                      <div>
                        {/* Upper Badging */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                            isNwdp 
                              ? "bg-amber-100 text-amber-800 dark:bg-cyan-455 dark:text-cyan-300"
                              : "bg-blue-50 text-primary-blue dark:bg-slate-800 dark:text-slate-350"
                          }`}>
                            {doc.badge}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 font-bold">{doc.fileSize}</span>
                        </div>

                        {/* Title & Desc */}
                        <h4 className="text-sm font-bold text-gray-800 dark:text-white leading-snug group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors">
                          {doc.title}
                        </h4>
                        
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {doc.description}
                        </p>
                      </div>

                      {/* Download Footer Metadata & Fire Button */}
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3">
                        <div className="space-y-0.5 text-[9px] text-gray-400 dark:text-slate-500 font-bold">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.publishDate}</span>
                          </div>
                        </div>

                        <a
                          href={doc.fileUrl}
                          target={doc.fileUrl.startsWith("#") ? undefined : "_blank"}
                          rel={doc.fileUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                            isNwdp 
                              ? "bg-amber-500 text-slate-950 hover:bg-amber-400 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950" 
                              : "bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          } ${doc.fileUrl === "#" ? "opacity-55 cursor-not-allowed" : ""}`}
                          onClick={(e) => {
                            if (doc.fileUrl === "#") {
                              e.preventDefault();
                              alert("This document is being indexed and will be available to authorized personnel shortly.");
                            }
                          }}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{doc.fileUrl === "#" ? "Restricted Access" : "Open PDF"}</span>
                        </a>
                      </div>

                      {/* Watermark accent */}
                      <div className="absolute right-4 bottom-14 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform">
                        <FileText className="w-20 h-20 text-[#00376c] dark:text-white" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* TAB 2: BASIN PHOTO GALLERY */}
          {(activeTab === "all" || activeTab === "gallery") && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#00376c]/10 dark:bg-cyan-500/10 text-primary-blue dark:text-cyan-400 rounded-xl">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#00376c] dark:text-white tracking-tight">Geospatial Aerial & Field Gallery</h2>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium font-mono">Topographical mapping samples and critical hydrologic surveys from the Brahmaputra network.</p>
                </div>
              </div>

              {/* Graphic Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`gallery-card-${item.id}`}
                    onClick={() => setSelectedImage(item)}
                    className="group bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full justify-between"
                  >
                    {/* Visual Schematic Box (Simulating real-time vector charts/photos) */}
                    <div className={`h-40 w-full bg-gradient-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}>
                      {/* Decorative GIS Grid Line Overlays */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                      
                      {/* Render simulated shape depending on type */}
                      {item.graphicType === "river" && (
                        <div className="w-full h-full relative flex items-center justify-center">
                          {/* S-shape river channel */}
                          <svg className="w-40 h-20 text-cyan-400/40" viewBox="0 0 100 50">
                            <path d="M10,25 C30,10 40,40 60,15 C80,5 90,30 100,20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                          </svg>
                          <span className="absolute bottom-2 right-2 text-[8px] font-mono font-bold text-white/50 border border-white/20 rounded px-1">
                            REMOTE SENSING
                          </span>
                        </div>
                      )}

                      {item.graphicType === "dots" && (
                        <div className="w-full h-full relative flex items-center justify-center gap-1.5">
                          {/* Pulsative radar nodes */}
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative z-10" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 relative z-10" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 relative z-10 animate-pulse" />
                          <span className="absolute bottom-2 right-2 text-[8px] font-mono font-bold text-white/50 border border-white/20 rounded px-1">
                            TELEMETRY NODES
                          </span>
                        </div>
                      )}

                      {item.graphicType === "grid" && (
                        <div className="w-full h-full relative flex items-center justify-center">
                          {/* Concentric Elevation Watershed */}
                          <div className="w-16 h-16 rounded-full border-4 border-dashed border-sky-400/20 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full border-4 border-sky-400/40 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-sky-450 dark:bg-cyan-500" />
                            </div>
                          </div>
                          <span className="absolute bottom-2 right-2 text-[8px] font-mono font-bold text-white/50 border border-white/20 rounded px-1">
                            DEM DELINEATION
                          </span>
                        </div>
                      )}

                      {item.graphicType === "bars" && (
                        <div className="w-full h-full relative flex items-end justify-center gap-2 pb-6">
                          {/* Simulated precipitation/inundation histogram */}
                          <div className="w-3 h-16 bg-cyan-400/40 rounded-t" />
                          <div className="w-3 h-24 bg-cyan-400/70 rounded-t" />
                          <div className="w-3 h-12 bg-sky-450 rounded-t" />
                          <div className="w-3 h-8 bg-blue-500 rounded-t" />
                          <span className="absolute bottom-2 right-2 text-[8px] font-mono font-bold text-white/50 border border-white/20 rounded px-1">
                            CAPACITY INDICES
                          </span>
                        </div>
                      )}

                      {/* Expand Action Icon */}
                      <div className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 rounded-lg text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Metadata brief */}
                    <div className="p-5 space-y-2 flex-grow">
                      <span className="text-[9px] font-mono font-bold text-primary-blue dark:text-cyan-400 uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-extrabold text-gray-850 dark:text-white leading-tight group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-gray-400 dark:text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer node badge */}
                    <div className="px-5 py-2.5 bg-gray-50 dark:bg-slate-900 border-t border-gray-150 dark:border-slate-800 text-[9px] font-mono font-bold text-slate-400 flex justify-between items-center">
                      <span className="uppercase">{item.location}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      {/* FULL-VIEW EXPANSION MODAL OVERLAY */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`gallery-card-${selectedImage.id}`}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Image schematic view */}
              <div className={`h-64 md:h-80 w-full bg-gradient-to-br ${selectedImage.color} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
                
                {/* Simulated shapes according to vector schematic */}
                {selectedImage.graphicType === "river" && (
                  <svg className="w-64 h-32 text-cyan-400/30" viewBox="0 0 100 50">
                    <path d="M10,25 C30,10 40,40 60,15 C80,5 90,30 100,20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                )}

                {selectedImage.graphicType === "dots" && (
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="w-4 h-4 rounded-full bg-cyan-400 relative" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 relative" />
                    <span className="w-4 h-4 rounded-full bg-blue-500 relative" />
                  </div>
                )}

                {selectedImage.graphicType === "grid" && (
                  <div className="w-24 h-24 rounded-full border-4 border-dashed border-sky-400/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-sky-400/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-sky-450 dark:bg-cyan-500" />
                    </div>
                  </div>
                )}

                {selectedImage.graphicType === "bars" && (
                  <div className="flex items-end gap-3 pb-8">
                    <div className="w-4 h-20 bg-cyan-400/40 rounded-t" />
                    <div className="w-4 h-32 bg-cyan-400/70 rounded-t" />
                    <div className="w-4 h-16 bg-sky-455 rounded-t" />
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/60 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                  {selectedImage.location}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Text Information Panel */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary-blue dark:text-cyan-400 uppercase tracking-[0.2em]">
                    {selectedImage.category}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">
                    AssamWRIS Archive
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-[#00376c] dark:text-white leading-tight">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="border-t border-gray-100 dark:border-slate-800 pt-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="text-[10px] text-gray-400 dark:text-slate-500 leading-relaxed font-bold font-mono">
                    <div>PUBLISHER: Nesac Earth Surveys</div>
                    <div>GEOGRAPHIC REF: WGS84 CRS84</div>
                  </div>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-5 py-2.5 bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-850 dark:hover:bg-cyan-400 transition-colors"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
