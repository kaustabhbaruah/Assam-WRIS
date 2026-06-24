export interface SpatialLayer {
  // source: any;
  id: string;
  name: string;
  typename: string;
  type: "Polygon" | "Line" | "Point" | "Point/Grid";
  category: "Administrative" | "Soil" | "Water & Hydrology" | "Stakeholder Data" | "River Infrastructure";
  description: string;
  
}

export const GEOSERVER_LAYERS: SpatialLayer[] = [
  {
    id: "state_boundary",
    name: "State Boundary",
    typename: "state_boundary",
    type: "Polygon",
    category: "Administrative",
    description: "The official political boundary of the state of Assam, providing the primary spatial reference envelope for all water statistics."
   
  },
  {
    id: "district_boundary",
    name: "District Boundary",
    typename: "district_boundary",
    type: "Polygon",
    category: "Administrative",
    description: "Multi-polygon layers representing the district boundaries of Assam with core demographic and area attributes.",
    
  },
  {
    id: "cgwb_data",
    name: "CGWB Dug Well",
    typename: "cgwb_data",
    type: "Point",
    category: "Stakeholder Data",
    description: "Central Ground Water Board (CGWB) monitoring well locations."
  },
  {
    id: "river_network",
    name: "River Network",
    typename: "river_network",
    type: "Line",
    category: "Water & Hydrology",
    description: "Comprehensive active stream and canal network mapping across the Brahmaputra and Barak valleys, capturing multi-tier tributaries."
  },
  {
    id: "wetland",
    name: "Wetland",
    typename: "wetland",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the spatial distribution of wetlands in Assam, including natural and man-made waterlogged areas such as marshes, swamps, floodplain wetlands, ponds, and other ecologically significant water bodies."
  },
  {
    id: "waterbodies_amrut",
    name: "AMRUT Water Bodies",
    typename: "waterbodies_amrut",
    type: "Polygon",
    category: "Stakeholder Data",
    description: "Represents mapped water bodies under the AMRUT(Atal Mission for Rejuvenation and Urban Transformation) framework in Assam, including rivers, lakes, ponds, reservoirs, tanks, and other surface water features."
  },
  {
    id: "ward_boundary",
    name: "Ward Boundary",
    typename: "ward_boundary",
    type: "Polygon",
    category: "Administrative",
    description: "Boundaries of wards within the state of Assam"
  },
  {
    id: "state_highway",
    name: "State Highway",
    typename: "state_highway",
    type: "Line",
    category: "Stakeholder Data",
    description: "Major state highways within the state of Assam"
  },
  {
    id: "soil_texture",
    name: "Soil Texture",
    typename: "soil_texture",
    type: "Polygon",
    category: "Soil",
    description: "Represents the spatial distribution of soil texture classes across Assam, categorizing soils based on the relative proportions of sand, silt, and clay"
  },
  {
    id: "revenue_circle",
    name: "Revenue Circle",
    typename: "revenue_circle",
    type: "Polygon",
    category: "Administrative",
    description: "Represents the administrative boundaries of revenue circles across Assam"
  },
  {
    id: "reserve_forests",
    name: "Reserve Forests",
    typename: "reserve_forests",
    type: "Polygon",
    category: "Soil",
    description: "Represents the boundaries of reserve forests across Assam"
  },
  {
    id: "pwd_landmark",
    name: "PWD Landmark",
    typename: "pwd_landmark",
    type: "Point",
    category: "Stakeholder Data",
    description: "Represents the locations of important landmarks maintained by the Public Works Department (PWD) across Assam"
  },
  {
    id: "protected_areas",
    name: "Protected Areas",
    typename: "protected_areas",
    type: "Polygon",
    category: "Soil",
    description: "Represents the locations of important landmarks maintained by the Public Works Department (PWD) across Assam"
  },
  {
    id: "bridge_points",
    name: "Bridge Points",
    typename: "bridge_points",
    type: "Point",
    category: "Stakeholder Data",
    description: "Represents the locations of bridges across Assam"
  },
  {
    id: "rtdas",
    name: "AIRBMP RTDAS",
    typename: "rtdas",
    type: "Point",
    category: "River Infrastructure",
    description: "Represents the locations of RTDAS stations across Assam under the AIRBMP (Assam Integrated River Basin Management Plan) initiative"
  },
  {
    id: "nhp_rtdas",
    name: "NHP RTDAS",
    typename: "nhp_rtdas",
    type: "Point",
    category: "River Infrastructure",
    description: "Represents the locations of RTDAS stations across Assam under the NHP (National Hydrology Project) initiative"
  },
  {
    id: "basin_boundary",
    name: "Basin Boundary",
    typename: "basin_boundary",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the boundaries of river basins across Assam"
  },
  {
    id: "embankment",
    name: "Embankment",
    typename: "embankment",
    type: "Line",
    category: "River Infrastructure",
    description: "Represents the locations of embankments across Assam"
  },
  {
    id: "sluice_gates",
    name: "Sluice Gates",
    typename: "sluice_gates",
    type: "Point",
    category: "River Infrastructure",
    description: "Represents the locations of sluice gates across Assam"
  },
  {
    id: "lulc",
    name: "Land Use Land Cover",
    typename: "lulc",
    type: "Polygon",
    category: "Soil",
    description: "Represents the spatial distribution of different land use and land cover types across Assam"
  },
  
  {
    id: "flood_layer_2024",
    name: "Flood Layer 2024",
    typename: "flood_layer_2024",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the flood-prone areas in Assam for the year 2024"
  },
  {
    id: "flood_layer_2023",
    name: "Flood Layer 2023",
    typename: "flood_layer_2023",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the flood-prone areas in Assam for the year 2023"
  },
  {
    id: "flood_layer_2022",
    name: "Flood Layer 2022",
    typename: "flood_layer_2022",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the flood-prone areas in Assam for the year 2022"
  },
  {
    id: "flood_layer_2021",
    name: "Flood Layer 2021",
    typename: "flood_layer_2021",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the flood-prone areas in Assam for the year 2021"
  },
  {
    id: "flood_layer_2020",
    name: "Flood Layer 2020",
    typename: "flood_layer_2020",
    type: "Polygon",
    category: "Water & Hydrology",
    description: "Represents the flood-prone areas in Assam for the year 2020"
  }

];
  




