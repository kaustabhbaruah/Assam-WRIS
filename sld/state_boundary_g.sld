<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>State_Boundary_Universal</Name>
    <UserStyle>
      <Title>Multi-Basemap State Boundary</Title>
      <Abstract>Optimized for visibility across Light, Dark, and Imagery basemaps.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Boundary Rendering</Name>
          
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#F39C12</CssParameter>
              <CssParameter name="fill-opacity">0.15</CssParameter>
            </Fill>
          </PolygonSymbolizer>
          
          <!-- <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">4.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-opacity">0.15</CssParameter>
            </Stroke>
          </LineSymbolizer>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FFFFFF</CssParameter>
              <CssParameter name="stroke-width">2.8</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-opacity">0.9</CssParameter>
            </Stroke>
          </LineSymbolizer> -->
          
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#F39C12</CssParameter>
              <CssParameter name="stroke-width">1.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>