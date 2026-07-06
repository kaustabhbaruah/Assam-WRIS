<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>embankment</Name>
    <UserStyle>
      <Title>Embankment Style</Title>
      <Abstract>Slate-grey thick hashed-appearance lines, depicting protective levees and embankments along river banks.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Embankment Lines</Name>
          <Title>Protective Levees / Embankments</Title>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#475569</CssParameter>
              <CssParameter name="stroke-width">2.2</CssParameter>
              <CssParameter name="stroke-dasharray">6 3 2 3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
