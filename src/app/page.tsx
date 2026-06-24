"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Map, Droplets, Activity, ChevronRight, Cpu, Database, Layers, FileText } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { GEOSERVER_LAYERS } from "@/constants/layers";

/**
 * KPI Component
 * 
 * Renders a key performance indicator card with an icon, value, and trend.
 */
const KPI = ({ icon: Icon, label, value, unit, trend, trendLabel, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
  >
    <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-on-surface-variant font-medium text-[11px] uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold text-primary-blue mt-1">
        {value}
        <span className="text-sm font-normal text-on-surface-variant ml-1">{unit}</span>
      </h3>
      {trend && (
        <p className={`text-[10px] font-bold flex items-center gap-1 mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trendLabel}
        </p>
      )}
    </div>
  </motion.div>
);

/**
 * HOME PAGE
 * 
 * The landing page for AssamWRIS, providing high-level summaries and navigation to specialized modules.
 */
export default function Home() {
  const { t, theme } = useUI();

  // Compute spatial dataset statistics dynamically based on the registered layers list
  const totalLayers = GEOSERVER_LAYERS.length;
  const adminLayersCount = GEOSERVER_LAYERS.filter(l => l.category === "Administrative").length;
  const soilLayersCount = GEOSERVER_LAYERS.filter(l => l.category === "Soil").length;
  const waterLayersCount = GEOSERVER_LAYERS.filter(l => l.category === "Water & Hydrology").length;

  return (
    <div className="bg-surface-bright dark:bg-slate-950 transition-colors duration-300">
      {/* 
        HERO SECTION 
        Introduces the platform mission and provides a quick call to action for the GIS Explorer.
      */}
      <section className="bg-gradient-to-br from-surface-bright to-surface-container dark:from-slate-950 dark:to-slate-900 pt-16 pb-24 px-6 md:px-12 relative overflow-hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container dark:bg-slate-800 text-primary-blue dark:text-cyan-400 rounded-full mb-6">
              {/* <Droplets className="w-4 h-4" /> */}
              {/* <span className="text-xs font-bold uppercase tracking-wider font-headline">{t("Water Resources Department")}</span> */}
            </div>
            <h1 className="text-5xl font-bold text-primary-blue dark:text-cyan-400 mb-6 leading-tight">
              {t("HeroTitle")}
            </h1>
            {/* <p className="text-lg text-on-surface-variant dark:text-slate-300 mb-8 max-w-xl">
              {t("HeroSubtitle")}
            </p> */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/explorer"
                className="bg-primary-blue dark:bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-primary-container dark:hover:bg-cyan-500 transition-all flex items-center gap-2"
              >
                <Map className="w-5 h-5" />
                {t("ExploreExplorer")}
              </Link>
            </div>
          </motion.div>

          {/* Visual Showcase - Brahamputra visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
          >
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzQH5UKrD-e8VJgKBXEc2NHW_4i0uyEGld_Yx3oKnYQ5gj6ll7XIPl2GfK4mUgvF4SXlCn7hRV_ZYG0RV7n7hPKqqsGSyDyGbYooBYOmCiXKeflVFR6NQgS7IvNfOacI5gWoz-f2X-pL-ThiPMBiY3hggP_9X3JY2NZHL-0gmncup_E49GcseEsD14rhsIZjtNSvYAxLSG0pgmr2B-DwiTDed2LYN_xmT8KcgBE0x4K7q8yXStTrqZ0VqqJC3ma9iHeL9sZ7gO34w" 
              alt="Brahmaputra Basin visualization" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/40 to-transparent" />
            
            {/* Live Station Status Overlay */}
            {/* <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-white/10 w-64 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary-blue dark:text-cyan-400">Live Stations</span>
                <span className="text-[10px] text-green-600 dark:text-emerald-400 font-bold bg-green-50 dark:bg-emerald-500/20 px-2 rounded">ONLINE</span>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue dark:bg-cyan-500 w-[88%]" />
                </div>
                <p className="text-[10px] text-on-surface-variant dark:text-slate-400 italic">342 of 389 stations reporting active telemetry.</p>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* 
        METRIC CARDS GRID 
        Real-time snapshots of the state's hydrological health.
      */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 font-headline">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPI icon={Layers} label="Total GIS Datasets" value={totalLayers} unit="Layers" trend={1} trendLabel="All datasets active" colorClass="bg-blue-50 dark:bg-blue-900/20 text-primary-blue dark:text-blue-400" />
          <KPI icon={Map} label="Administrative Boundaries" value={adminLayersCount} unit="Layers" trend={1} trendLabel="Boundaries & Districts" colorClass="bg-cyan-50 dark:bg-cyan-900/20 text-aquatic-teal dark:text-cyan-455" />
          <KPI icon={Database} label="Soil Layers" value={soilLayersCount} unit="Layers" trend={1} trendLabel="Land Resources" colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" />
          <KPI icon={Droplets} label="Water & Hydrology" value={waterLayersCount} unit="Layers" trend={1} trendLabel="River networks" colorClass="bg-blue-50 dark:bg-blue-900/20 text-primary-blue dark:text-cyan-400" />
        </div>
      </section>

      {/* 
        INTEGRATED INFORMATION SYSTEM (BENTO GRID)
        Highlights the structural modules of the WRIS platform.
      */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-blue dark:text-cyan-400">{t("DataArchitecture")}</h2>
          <p className="text-on-surface-variant dark:text-slate-400 text-lg mt-2">Comprehensive modules for statewide resource analysis.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* GIS Module Card */}
          <div className="md:col-span-8 bg-primary-blue dark:bg-slate-900 rounded-3xl p-10 relative overflow-hidden group min-h-[380px] shadow-xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfbL3ODmXIF0X0yR68Npyns0XpWvx58UiK6KwDqG_WxORdEWcTm2lRt8uLaljYYI_BgqHyt-Y_xhmkoRZ7vauEgUkJ13MIFN71xWTcLmv-MQX1TUBKRa2Ovpn9FuOh39qlZnUWNf80wPV5t6822Ns1dzgIS67w49sRdxNn5jW23vuz0bFeTDpf_Ss_-O8bDsJD9nJDgIvGNM4afq_yOFGOa0h-_p634dHxQRR0gq8ORWQiH0YemX6EX6yK6ul2PYu2Ne4QF_VdtMQ" 
              className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-5 group-hover:scale-110 transition-transform duration-1000" 
              alt="Assam Terrain Pattern" 
            />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <Map className="text-aquatic-teal dark:text-cyan-400 w-14 h-14 mb-6" />
                <h3 className="text-white text-3xl font-bold mb-4">{t("GIS Explorer")}</h3>
                <p className="text-blue-100/80 dark:text-slate-300 max-w-lg leading-relaxed">
                  The primary spatial analytics portal featuring dynamic data layers, including river networks, district boundaries, rainfall grids and basin catchment boundaries etc. Provides interactive map-based exploration, filtering, and metadata access for all registered datasets in the Assam-WRIS geospatial registry.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] text-white uppercase tracking-widest font-bold border border-white/20">Administrative Boundaries</span>
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] text-white uppercase tracking-widest font-bold border border-white/20">River Basins</span>
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] text-white uppercase tracking-widest font-bold border border-white/20">Wetlands</span>
              </div>
            </div>
          </div>

          {/* Hydrology Module Card */}
          <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-10 border border-gray-100 dark:border-slate-800 flex flex-col justify-between shadow-lg transition-colors">
            <div>
              <Droplets className="text-primary-blue dark:text-cyan-400 w-12 h-12 mb-6" />
              <h3 className="text-primary-blue dark:text-cyan-400 text-2xl font-bold mb-4">{t("PrecisionHydrology")}</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-sm leading-relaxed">
                
                The Assam Water Resources Information System (Assam-WRIS) is an on-going initiative of the Hydro Informatics Unit (HIU), Water Resources Department, Government of Assam, notified to act as the State Water Informatics Centre (SWIC), Assam.
                <br /><br />
                This portal is in alignment with National Water Data Policy, 2026 of Govt. of India and the framework of the National Water Informatics Centre (NWIC).Assam-WRIS has been conceptualized to serve as a centralized repository and dissemination platform for water-related GIS and geospatial datasets of the State of Assam with concerned stakeholders participation.
              </p>
            </div>
            <div className="mt-8 space-y-4">
               <a
                 href="https://nwic.gov.in/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 bg-surface-bright dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 group cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-all block"
               >
                  <Activity className="w-5 h-5 text-primary-blue dark:text-cyan-400" />
                  <span className="text-sm font-bold text-primary-blue dark:text-cyan-400">NWIC</span>
               </a>
               <a
                 href="https://indiawris.gov.in/wris/#/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 bg-surface-bright dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 group cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-all block"
               >
                  <Droplets className="w-5 h-5 text-aquatic-teal dark:text-cyan-400" />
                  <span className="text-sm font-bold text-primary-blue dark:text-cyan-400">India-WRIS</span>
               </a>

                <a
                 href="https://172.16.4.139:8443"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 bg-surface-bright dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 group cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-all block"
               >
                  <Activity className="w-5 h-5 text-primary-blue dark:text-cyan-400" />
                  <span className="text-sm font-bold text-primary-blue dark:text-cyan-400">Assam SWDP</span>
               </a>



            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
