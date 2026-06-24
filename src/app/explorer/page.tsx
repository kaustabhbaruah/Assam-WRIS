"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Layers, Map as MapIcon, Waves, Radio as Sensors, Download, Info, Plus, Minus, ChevronDown, ChevronUp, Database } from "lucide-react";
import { useUI } from "@/context/UIContext";

// Dynamically import map component to keep things performant
const MapComponent = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center transition-colors">
      <div className="flex flex-col items-center gap-4 text-center p-6">
        <div className="w-12 h-12 border-4 border-primary-blue/15 border-t-primary-blue rounded-full animate-spin shadow-sm" />
        <div>
          <span className="text-xs font-black text-primary-blue dark:text-cyan-400 tracking-[0.2em] uppercase block mb-1 underline decoration-2 underline-offset-4">INITIALIZING ENGINE</span>
          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Synchronizing spatial geometry...</p>
        </div>
      </div>
    </div>
  )
});

export default function Explorer() {
  const { t } = useUI();
  
  // State for map controls
  const [mapInstance, setMapInstance] = useState<any | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Layer switches (Synced with Sidebar and MapComponent props)

  const [showStateBoundary, setShowStateBoundary] = useState(false);
  const [showDistrictBoundary, setShowDistrictBoundary] = useState(false);
  const [showCGWBLayer, setShowCGWBLayer] = useState(false);
  const [showRiverNetwork, setShowRiverNetwork] = useState(false);
  const [showWetland, setShowWetland] = useState(false);
  const [showWaterbodiesAmrut, setShowWaterbodiesAmrut] = useState(false);
  const [showWardBoundary, setShowWardBoundary] = useState(false);
  const [showStateHighway, setShowStateHighway] = useState(false);
  const [showSoilTexture, setShowSoilTexture] = useState(false);
  const [showRevenueCircle, setShowRevenueCircle] = useState(false);
  const [showReserveForests, setShowReserveForests] = useState(false);
  const [showPwdLandmark, setShowPwdLandmark] = useState(false);
  const [showProtectedAreas, setShowProtectedAreas] = useState(false);
  const [showBridgePoints, setShowBridgePoints] = useState(false);
  const [showRtdas, setShowRtdas] = useState(false);
  const [showNhpRtdas, setShowNhpRtdas] = useState(false);
  const [showEmbankment, setShowEmbankment] = useState(false);
  const [showSluiceGates, setShowSluiceGates] = useState(false);
  const [showBasinBoundary, setShowBasinBoundary] = useState(false);
  const [showLULCLayer, setShowLULCLayer] = useState(false);
  const [showFloodLayers, setShowFloodLayers] = useState(false);
  const [selectedFloodYear, setSelectedFloodYear] = useState("2024");
 


  // Dropdown collapse/expand states for GIS Toolbox sections
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSoilOpen, setIsSoilOpen] = useState(false);
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isStakeholderOpen, setIsStakeholderOpen] = useState(false);
  const [isInfrastructureOpen, setIsInfrastructureOpen] = useState(false);

  // Compute active map layers with geometry and color mapping to support a dynamic legend state
  const activeLayers = useMemo(() => {
    const layers: { id: string; name: string; color: string; type: string; }[] = [];
    if (showStateBoundary) {
      layers.push({ id: 'state_boundary', name: 'State Boundary', color: '#f97316', type: 'Polygon' });
    }
    if (showDistrictBoundary) {
      layers.push({ id: 'district_boundary', name: 'District Boundary', color: '#a855f7', type: 'Polygon' });
    }
    if (showCGWBLayer) {
      layers.push({ id: 'cgwb_data', name: 'CGWB Dug Well', color: '#0ea5e9', type: 'Point' });
    }
    if (showRiverNetwork) {
      layers.push({ id: 'river_network', name: 'River Network', color: '#2563eb', type: 'Line' });
    }
    if (showWetland) {
      layers.push({ id: 'wetland', name: 'Wetland', color: '#10b981', type: 'Polygon' });
    }
    if (showWaterbodiesAmrut) {
      layers.push({ id: 'waterbodies_amrut', name: 'AMRUT Water Bodies', color: '#49f0b8', type: 'Polygon' });
    }
    if (showWardBoundary) {
      layers.push({ id: 'ward_boundary', name: 'Ward Boundary', color: '#f43f5e', type: 'Polygon' });
    }
    if (showStateHighway) {
      layers.push({ id: 'state_highway', name: 'State Highway', color: '#0284c7', type: 'Line' });
    }
    if (showSoilTexture) {
      layers.push({ id: 'soil_texture', name: 'Soil Texture', color: '#978a0e', type: 'Polygon' });
    }
    if (showRevenueCircle) {
      layers.push({ id: 'revenue_circle', name: 'Revenue Circle', color: '#d97706', type: 'Polygon' });
    }
    if (showReserveForests) {
      layers.push({ id: 'reserve_forests', name: 'Reserve Forests', color: '#14b8a6', type: 'Polygon' });
    }
    if (showPwdLandmark) {
      layers.push({ id: 'pwd_landmark', name: 'PWD Landmarks', color: '#e11d48', type: 'Point' });
    }
    if (showProtectedAreas) {
      layers.push({ id: 'protected_areas', name: 'Protected Areas', color: '#22c55e', type: 'Polygon' });
    }
    if (showBridgePoints) {
      layers.push({ id: 'bridge_points', name: 'Bridge Gauge Points', color: '#eab308', type: 'Point' });
    }
    if (showRtdas) {
      layers.push({ id: 'rtdas', name: 'RTDAS Points', color: '#8b5cf6', type: 'Point' });
    }
    if (showNhpRtdas) {
      layers.push({ id: 'nhp_rtdas', name: 'NHP RTDAS Points', color: '#f472b6', type: 'Point' });
    }
    if (showEmbankment) {
      layers.push({ id: 'embankment', name: 'Embankment Locations', color: '#f59e0b', type: 'Line' });
    }
    if (showSluiceGates) {
      layers.push({ id: 'sluice_gates', name: 'Sluice Gates', color: '#10b981', type: 'Point' });
    }
    if (showBasinBoundary) {
      layers.push({ id: 'basin_boundary', name: 'Basin Boundary', color: '#3b82f6', type: 'Polygon' });
    }
    if (showLULCLayer) {
      layers.push({ id: 'lulc_layer', name: 'Land Use Land Cover (LULC)', color: '#073a27', type: 'Polygon' });
    }
    if (showFloodLayers) {
      layers.push({ id: `flood_layer_${selectedFloodYear}`, name: `Flood Inundation (${selectedFloodYear})`, color: '#06b6d4', type: 'Polygon' })
    }





    return layers;
  }, [
    showStateBoundary,
    showDistrictBoundary,
    showCGWBLayer,
    showRiverNetwork,
    showWetland,
    showWaterbodiesAmrut,
    showWardBoundary,
    showStateHighway,
    showSoilTexture,
    showRevenueCircle,
    showReserveForests,
    showPwdLandmark,
    showProtectedAreas,
    showBridgePoints,
    showRtdas,
    showNhpRtdas,
    showEmbankment,
    showSluiceGates,
    showBasinBoundary,
    showLULCLayer,
    showFloodLayers,
    selectedFloodYear
  ]);

  // Detect initialization timeout to help users on slower networks
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapInstance) {
        console.warn("Map initialization taking longer than normal...");
        setLoadError(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [mapInstance]);

  // Sidebar reusable item component
  const SidebarItem = useMemo(() => function SidebarItem({ label, checked = false, onChange }: any) {
    return (
      <label className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
          <input 
            checked={checked} 
            onChange={(e) => onChange ? onChange(e.target.checked) : null}
            className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue transition-colors cursor-pointer" 
            type="checkbox" 
          />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors">{label}</span>
        </div>
      </label>
    );
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden relative bg-white dark:bg-slate-950 transition-colors duration-300 animate-in fade-in duration-300">
      
      {/* SIDE TOOLBOX */}
      <aside className="w-80 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col z-40 transition-all">
        {/* Header Block */}
        <div className="p-5 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-blue dark:bg-cyan-600 flex items-center justify-center rounded-xl shadow-sm">
              <MapIcon className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-blue dark:text-cyan-400 leading-none">{t("GIS Toolbox")}</h2>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-wider">Layer Management</p>
            </div>
          </div>
        </div>
        
        {/* Layer Checkbox List Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          
          {/* Section: Administrative */}
          <section className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none select-none group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="text-primary-blue dark:text-cyan-400 w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-blue dark:text-cyan-400">Legal & Admin</h3>
              </div>
              {isAdminOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              )}
            </button>
            
            {isAdminOpen && (
              <div className="space-y-1 mt-3 pt-2 animate-in fade-in duration-200">
                <SidebarItem 
                  label="State Boundary" 
                  checked={showStateBoundary} 
                  onChange={(val: boolean) => setShowStateBoundary(val)} 
                />
                 <SidebarItem 
                  label="District Boundary" 
                  checked={showDistrictBoundary} 
                  onChange={(val: boolean) => setShowDistrictBoundary(val)} 
                />
                <SidebarItem 
                  label="Revenue Circle" 
                  checked={showRevenueCircle} 
                  onChange={(val: boolean) => setShowRevenueCircle(val)} 
                />
                <SidebarItem 
                  label="Ward Boundary" 
                  checked={showWardBoundary} 
                  onChange={(val: boolean) => setShowWardBoundary(val)} 
                />
               
              </div>
            )}
          </section>

          {/* Section: Soil */}
          <section className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => setIsSoilOpen(!isSoilOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none select-none group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="text-primary-blue dark:text-cyan-400 w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-blue dark:text-cyan-400">Land Resources</h3>
              </div>
              {isSoilOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              )}
            </button>
            
            {isSoilOpen && (
              <div className="space-y-1 mt-3 pt-2 animate-in fade-in duration-200">
                <SidebarItem 
                  label="Soil Texture" 
                  checked={showSoilTexture} 
                  onChange={(val: boolean) => setShowSoilTexture(val)}
                />
                <SidebarItem 
                  label="Reserve Forests" 
                  checked={showReserveForests} 
                  onChange={(val: boolean) => setShowReserveForests(val)} 
                />
                <SidebarItem 
                  label="Protected Areas" 
                  checked={showProtectedAreas} 
                  onChange={(val: boolean) => setShowProtectedAreas(val)} 
                />
                <SidebarItem 
                  label="Land Use Land Cover (LULC)" 
                  checked={showLULCLayer} 
                  onChange={(val: boolean) => setShowLULCLayer(val)} 
                />
              </div>
            )}
          </section>

          {/* Section: Water & Hydrology */}
          <section className="pb-2">
            <button
              onClick={() => setIsWaterOpen(!isWaterOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none select-none group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="text-primary-blue dark:text-cyan-400 w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-blue dark:text-cyan-400">Water & Hydrology</h3>
              </div>
              {isWaterOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              )}
            </button>
            
            {isWaterOpen && (
              <div className="space-y-1 mt-3 pt-2 animate-in fade-in duration-200">
                <SidebarItem 
                  label="River Network" 
                  checked={showRiverNetwork} 
                  onChange={(val: boolean) => setShowRiverNetwork(val)} 
                />
                <SidebarItem 
                  label="Wetland" 
                  checked={showWetland} 
                  onChange={(val: boolean) => setShowWetland(val)} 
                />
                <SidebarItem 
                  label="Basin Boundary" 
                  checked={showBasinBoundary} 
                  onChange={(val: boolean) => setShowBasinBoundary(val)} 
                />


                {/* Flood subcategory dropdown choice */}
                <div className="border border-blue-100/40 dark:border-slate-800 rounded-xl p-2.5 bg-white/70 dark:bg-slate-950/40 mt-1.5 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input 
                        checked={showFloodLayers} 
                        onChange={(e) => setShowFloodLayers(e.target.checked)}
                        className="w-4 h-4 text-primary-blue dark:text-cyan-500 border-gray-300 rounded focus:ring-primary-blue cursor-pointer" 
                        type="checkbox" 
                      />
                      <span className="text-sm font-bold text-gray-700 dark:text-slate-300 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors">
                        Flood Inundation Map
                      </span>
                    </div>
                  </label>
                  
                  {showFloodLayers && (
                    <div className="pl-7 pr-1 space-y-1.5 animate-in fade-in duration-200 font-sans">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 font-mono">Select Flood Year:</span>
                        <select
                          value={selectedFloodYear}
                          onChange={(e) => setSelectedFloodYear(e.target.value)}
                          className="text-[10px] bg-gray-50 dark:bg-slate-800 text-[#00376c] dark:text-cyan-400 border border-gray-200 dark:border-slate-705 px-2 py-1 rounded-lg font-bold outline-none cursor-pointer"
                        >
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                      </div>
                      {/* <p className="text-[9px] text-gray-400 dark:text-slate-500 font-mono leading-normal">
                        Renders historical mapping models.
                      </p> */}
                    </div>
                  )}
               
                </div>

              </div>
            )}
          </section>

            {/* Section: River Infrastructure */}
          <section className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => setIsInfrastructureOpen(!isInfrastructureOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none select-none group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="text-primary-blue dark:text-cyan-400 w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-blue dark:text-cyan-400">River Infrastructure</h3>
              </div>
              {isInfrastructureOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              )}
            </button>
            
            {isInfrastructureOpen && (
              <div className="space-y-1 mt-3 pt-2 animate-in fade-in duration-200">
                <SidebarItem 
                  label="Embankment" 
                  checked={showEmbankment} 
                  onChange={(val: boolean) => setShowEmbankment(val)} 
                />
                 <SidebarItem 
                  label="Sluice Gates" 
                  checked={showSluiceGates} 
                  onChange={(val: boolean) => setShowSluiceGates(val)} 
                />
                <SidebarItem 
                  label="AIRBMP RTDAS" 
                  checked={showRtdas} 
                  onChange={(val: boolean) => setShowRtdas(val)} 
                />
                <SidebarItem 
                  label="NHP RTDAS" 
                  checked={showNhpRtdas} 
                  onChange={(val: boolean) => setShowNhpRtdas(val)} 
                />
               
              </div>
            )}
          </section>


          {/* Section: Stakeholders */}
          <section className="pb-2">
            <button
              onClick={() => setIsStakeholderOpen(!isStakeholderOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none select-none group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="text-primary-blue dark:text-cyan-400 w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-blue dark:text-cyan-400">Stakeholder's Data</h3>
              </div>
              {isStakeholderOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-blue dark:group-hover:text-cyan-400 transition-colors" />
              )}
            </button>

            {isStakeholderOpen && (
              <div className="space-y-1 mt-3 pt-2 animate-in fade-in duration-200">
                <SidebarItem 
                  label="CGWB Dug Well" 
                  checked={showCGWBLayer} 
                  onChange={(val: boolean) => setShowCGWBLayer(val)} 
                />
                <SidebarItem 
                  label="AMRUT Water Bodies" 
                  checked={showWaterbodiesAmrut} 
                  onChange={(val: boolean) => setShowWaterbodiesAmrut(val)} 
                />
                <SidebarItem 
                  label="State Highway" 
                  checked={showStateHighway} 
                  onChange={(val: boolean) => setShowStateHighway(val)} 
                />
                <SidebarItem 
                  label="PWD Landmark" 
                  checked={showPwdLandmark} 
                  onChange={(val: boolean) => setShowPwdLandmark(val)} 
                />
                <SidebarItem 
                  label="Bridge Points" 
                  checked={showBridgePoints} 
                  onChange={(val: boolean) => setShowBridgePoints(val)} 
                />
              </div>
            )}
          </section>

        </div>

      </aside>

      {/* VIEWPORT CONTROLS */}
      <main className="flex-1 relative bg-surface-container dark:bg-slate-950 overflow-hidden">
        
        {/* Dynamic Mapping Canvas */}
        <MapComponent 
          onMapReady={setMapInstance} 
          activeLayers={activeLayers}
          isStateBoundaryVisible={showStateBoundary}
          isDistrictBoundaryVisible={showDistrictBoundary}
          isCGWBLayerVisible={showCGWBLayer}
          isRiverNetworkVisible={showRiverNetwork}
          isWetlandVisible={showWetland}
          isWaterbodiesAmrutVisible={showWaterbodiesAmrut}
          isWardBoundaryVisible={showWardBoundary}
          isStateHighwayVisible={showStateHighway}
          isSoilTextureVisible={showSoilTexture}
          isRevenueCircleVisible={showRevenueCircle}
          isReserveForestsVisible={showReserveForests}
          isPwdLandmarkVisible={showPwdLandmark}
          isProtectedAreasVisible={showProtectedAreas}
          isBridgePointsVisible={showBridgePoints}
          isRtdasVisible={showRtdas}
          isNhpRtdasVisible={showNhpRtdas}
          isEmbankmentVisible={showEmbankment}
          isSluiceGatesVisible={showSluiceGates}
          isBasinBoundaryVisible={showBasinBoundary}
          isLULCLayerVisible={showLULCLayer}
          isFloodLayersVisible={showFloodLayers}
          selectedFloodYear={selectedFloodYear}
        />

        {/* FLOATER COMPASS ZOOM PANEL */}
        <div className="absolute top-6 right-6 flex flex-col gap-1.5 z-30">
          <button 
            id="zoom-in-button"
            onClick={() => {
              if (mapInstance) {
                const view = mapInstance.getView();
                view.setZoom(view.getZoom() + 1);
              }
            }}
            className="w-8 h-8 bg-white dark:bg-slate-900 shadow-lg rounded-xl flex items-center justify-center text-primary-blue dark:text-cyan-400 hover:scale-[1.05] active:scale-95 transition-all border border-gray-100 dark:border-slate-800"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            id="zoom-out-button"
            onClick={() => {
              if (mapInstance) {
                const view = mapInstance.getView();
                view.setZoom(view.getZoom() - 1);
              }
            }}
            className="w-8 h-8 bg-white dark:bg-slate-900 shadow-lg rounded-xl flex items-center justify-center text-primary-blue dark:text-cyan-400 hover:scale-[1.05] active:scale-95 transition-all border border-gray-100 dark:border-slate-800"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Timeout Fallback Trigger */}
        {loadError && !mapInstance && (
          <div className="absolute inset-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-8 text-center">
             <div className="max-w-md space-y-6">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                   <Info className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-primary-blue dark:text-cyan-400">GIS Sync Interrupted</h3>
                   <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                     The mapping engine is synchronizing spatial coordinates. Please wait or reload if connectivity latency persists.
                   </p>
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-primary-blue dark:bg-cyan-600 text-white rounded-xl text-sm font-black shadow-lg hover:bg-primary-container transition-all uppercase tracking-widest"
                >
                  Force Engine Reload
                </button>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4">AssamWRIS Geo-Portal v1.2</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
