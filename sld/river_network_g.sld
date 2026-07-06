<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>River_Network</Name>
    <UserStyle>
      <Title>Multi-Basemap River_Network</Title>
      <Abstract>Optimized for visibility across Light, Dark, and Imagery basemaps.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Boundary Rendering</Name>
          
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#0B78F4</CssParameter>
              <CssParameter name="fill-opacity">0.15</CssParameter>
            </Fill>
          </PolygonSymbolizer>

          
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#0B78F4</CssParameter>
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