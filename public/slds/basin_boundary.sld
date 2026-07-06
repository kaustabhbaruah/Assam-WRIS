<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>basin_boundary</Name>
    <UserStyle>
      <Title>Basin Boundary Style</Title>
      <Abstract>Soft blue wide stroke for major drainage basin boundaries, styled as un-filled overlay borders.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Basin Boundary</Name>
          <Title>River Basins</Title>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#3b82f6</CssParameter>
              <CssParameter name="stroke-width">2.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
