"use client";

import { useState, useMemo } from "react";
import { GEOSERVER_LAYERS, SpatialLayer } from "@/constants/layers";
import { useUI } from "@/context/UIContext";
import { 
  Download, 
  Search, 
  Layers, 
  MapPin, 
  Database, 
  ExternalLink, 
  Tag, 
  Filter, 
  FileText, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * DATA CATALOG PAGE
 */
export default function Catalog() {
  const { t } = useUI();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Available unique categories
  const categories = ["All", "Administrative", "Soil", "Water & Hydrology"];

  // Filter layers dynamically based on input and category selected
  const filteredLayers = useMemo(() => {
    return GEOSERVER_LAYERS.filter((layer) => {
      const matchesSearch = 
        layer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        layer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        layer.description.toLowerCase().includes(searchTerm.toLowerCase());
        // layer.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || layer.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Statistics summaries computed dynamically from metadata
  const stats = useMemo(() => {
    const total = GEOSERVER_LAYERS.length;
    const admin = GEOSERVER_LAYERS.filter(l => l.category === "Administrative").length;
    const soil = GEOSERVER_LAYERS.filter(l => l.category === "Soil").length;
    const water = GEOSERVER_LAYERS.filter(l => l.category === "Water & Hydrology").length;
    return { total, admin, soil, water };
  }, []);

  /**
   * Triggers download action call to the proxy API endpoint
   */
  const handleDownload = async (layerId: string, format: string, service: "WMS" | "WFS") => {
    setDownloadingId(`${layerId}-${format}`);
    setDownloadError(null);
    try {
      const url = `/api/geoserver/download?layer=${layerId}&format=${encodeURIComponent(format)}&service=${service}`;
      
      // Trigger a standard browser file download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${layerId}_export`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      setDownloadError(`Failed to prepare download for ${layerId}: ${err.message}`);
    } finally {
      // Small timeout to give feedback
      setTimeout(() => {
        setDownloadingId(null);
      }, 1000);
    }
  };

  return (
    <div className="bg-surface-bright dark:bg-slate-950 transition-colors duration-300 min-h-screen pb-24">
      
      {/* HEADER HERO AREA */}
      <section className="bg-gradient-to-br from-blue-50 to-surface-container dark:from-slate-950 dark:to-slate-900 pt-16 pb-12 px-6 md:px-12 border-b border-blue-100/50 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-850 text-primary-blue dark:text-cyan-400 rounded-full mb-4 border border-blue-100/50 dark:border-slate-800 shadow-sm">
            <Database className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{t("Government Registry")}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-blue dark:text-cyan-400 mb-4">
            Spatial Data Catalog
          </h1>
          <p className="text-base text-on-surface-variant dark:text-slate-300 max-w-2xl leading-relaxed">
            Access, explore, and download high-quality OGC-compliant layers published by the Water Resources Department. Direct integration with GIS and modeling software is supported via Web Map Service (WMS) interfaces.
          </p>
          
          {/* DYNAMIC META COUNTERS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl">
            <div className="bg-white/70 dark:bg-slate-900/40 p-4 rounded-xl border border-blue-100/30 dark:border-slate-850 shadow-sm backdrop-blur-sm">
              <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">Total GIS Datasets</span>
              <span className="text-2xl font-black text-primary-blue dark:text-cyan-400 mt-1 block font-mono">{stats.total} Layers</span>
            </div>
            <div className="bg-white/70 dark:bg-slate-900/40 p-4 rounded-xl border border-blue-100/30 dark:border-slate-850 shadow-sm backdrop-blur-sm">
              <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">Administrative boundaries</span>
              <span className="text-2xl font-black text-[#0c4a6e] dark:text-cyan-400 mt-1 block font-mono">{stats.admin} Layers</span>
            </div>
            <div className="bg-white/70 dark:bg-slate-900/40 p-4 rounded-xl border border-blue-100/30 dark:border-slate-850 shadow-sm backdrop-blur-sm">
              <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">Soil Layers</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block font-mono">{stats.soil} Layers</span>
            </div>
            <div className="bg-white/70 dark:bg-slate-900/40 p-4 rounded-xl border border-blue-100/30 dark:border-slate-850 shadow-sm backdrop-blur-sm">
              <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">Water & Hydrology</span>
              <span className="text-2xl font-black text-primary-blue dark:text-cyan-400 mt-1 block font-mono">{stats.water} Layers</span>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid lg:grid-cols-12 gap-8">
        
        {/* FILTERS & SEARCH ROW */}
        <div className="lg:col-span-12 flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Filter by keyword, source, geometry..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-950 border border-gray-250 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-1 focus:ring-primary-blue/30 focus:border-primary-blue transition-colors outline-none"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 items-center w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-gray-450 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-primary-blue dark:bg-cyan-600 text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {downloadError && (
          <div className="lg:col-span-12 p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl flex items-center gap-3 text-xs font-medium animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <span className="font-bold">Exporter Feedback:</span> {downloadError}
            </div>
          </div>
        )}

        {/* CATALOG LISTINGS GRID */}
        <div className="lg:col-span-9 space-y-6">
          {filteredLayers.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-850 rounded-2xl">
              <Layers className="w-12 h-12 text-gray-350 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-base font-bold text-gray-700 dark:text-slate-300">No datasets match query</h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">Try resetting the keyword filter or category category tab to view published records.</p>
            </div>
          ) : (
            filteredLayers.map((layer) => (
              <motion.article 
                key={layer.id}
                layoutId={`card-${layer.id}`}
                className="bg-white dark:bg-slate-900/80 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-blue-100 dark:hover:border-slate-700 p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-8 transition-all hover:shadow-md"
              >
                {/* Visual Metadata Thumbnail Column */}
                <div className="md:w-44 flex-shrink-0 flex flex-col gap-3">
                  <div className="p-4 bg-blue-50/50 dark:bg-slate-950/50 border border-blue-100/30 dark:border-slate-850 rounded-xl flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary-blue dark:text-cyan-400 mb-2">Vector Typename</span>
                    <span className="font-mono text-[10px] bg-white dark:bg-slate-900 px-2 py-1 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 rounded font-semibold break-all leading-tight">
                      {layer.id}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-[10px] font-bold">
                    <div className="flex items-center justify-between text-gray-500 dark:text-slate-400">
                      <span>Geometry:</span>
                      <span className="font-mono text-gray-800 dark:text-slate-200">{layer.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 dark:text-slate-400">
                      <span>Category:</span>
                      <span className="text-primary-blue dark:text-cyan-400 uppercase tracking-tighter block">{layer.category}</span>
                    </div>
                  </div>
                </div>
                
                {/* Information and download actions */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
                        {layer.name}
                      </h3>
                      <span className="px-2 py-0.5 text-[8.5px] uppercase font-black tracking-wider rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400">
                        {layer.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {layer.description}
                    </p>
                    
                    {/* Source Information */}
                    <div className="flex items-center gap-2 text-[10.5px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      <Tag className="w-3.5 h-3.5 text-gray-400/80" />
                      <span>Publisher:</span>
                      {/* <span className="text-gray-700 dark:text-slate-300">{layer.source}</span> */}
                    </div>
                  </div>

                  {/* DOWNLOAD CONTROL BOX - WMS INTEGRATION */}
                  <div className="border-t border-gray-100 dark:border-slate-850 mt-6 pt-5">
                    
                    {/* WMS Downloads Section (Requested format) */}
                    <div className="bg-blue-50/20 dark:bg-slate-950/20 p-4 rounded-xl border border-blue-100/30 dark:border-slate-850">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00376c] dark:text-cyan-400 mb-3 block">
                        Web Map Service (WMS) Exporter
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={() => handleDownload(layer.id, "image/png", "WMS")}
                          disabled={downloadingId !== null}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-850 text-xs font-bold text-gray-700 dark:text-slate-300 border border-gray-200/50 dark:border-slate-800 disabled:opacity-50 transition-colors"
                        >
                          <span>PNG Image Overlay</span>
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDownload(layer.id, "application/pdf", "WMS")}
                          disabled={downloadingId !== null}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-850 text-xs font-bold text-gray-700 dark:text-slate-300 border border-gray-200/50 dark:border-slate-800 disabled:opacity-50 transition-colors"
                        >
                          <span>PDF Document</span>
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDownload(layer.id, "kml", "WMS")}
                          disabled={downloadingId !== null}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-gray-150 dark:bg-slate-900 dark:hover:bg-slate-350 text-xs font-bold border disabled:opacity-50 transition-colors text-primary-blue dark:text-cyan-400 border-primary-blue/30 dark:border-cyan-400/30"
                        >
                          <span className="flex items-center gap-1.5">🌐 Google Earth KML Overlay</span>
                          <Download className="w-4 h-4 text-primary-blue/70 dark:text-cyan-400/70" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* SIDEBAR GUIDE PANEL */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Quick Integration Info */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00376c] dark:text-cyan-400 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary-blue dark:text-cyan-400" />
              <span>GIS Integration</span>
            </h4>
            
            <p className="text-[11.5px] text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
              All datasets are hosted on our GIS infrastructure and exposed through OGC standard endpoints. You can load these layers live into QGIS, ArcGIS, or custom web clients!
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-950 p-2.5 rounded-lg border border-gray-100 dark:border-slate-850 text-[10.5px]">
                <span className="font-extrabold text-[#00376c] dark:text-cyan-400 block mb-1">WMS Service URL:</span>
                <code className="block bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 p-1.5 border border-gray-200 dark:border-slate-800 font-mono text-[9px] rounded break-all select-all">
                  {`/api/geoserver?service=wms`}
                </code>
              </div>
            </div>
          </div>

        </aside>
      </main>

    </div>
  );
}
