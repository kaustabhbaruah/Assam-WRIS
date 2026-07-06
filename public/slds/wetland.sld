<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>wetland</Name>
    <UserStyle>
      <Title>Wetland Style</Title>
      <Abstract>Teal and aquamarine semi-transparent fill for wetlands, optimized for dark and light basemaps.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Wetland Areas</Name>
          <Title>Wetlands</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#0d9488</CssParameter>
              <CssParameter name="fill-opacity">0.45</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#0f766e</CssParameter>
              <CssParameter name="stroke-width">1.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
