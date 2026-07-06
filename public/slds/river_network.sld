<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>river_network</Name>
    <UserStyle>
      <Title>River Network Style</Title>
      <Abstract>Flowing hydrographic blue line style with rounded joins for smooth river network rendering.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>River Flow</Name>
          <Title>River Networks</Title>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#0284c7</CssParameter>
              <CssParameter name="stroke-width">1.8</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
