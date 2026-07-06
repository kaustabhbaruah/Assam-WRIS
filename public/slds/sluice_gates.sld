<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>sluice_gates</Name>
    <UserStyle>
      <Title>Sluice Gates Style</Title>
      <Abstract>Vibrant sky blue cross markers indicating active water control gates and drainage structures.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Sluice Gate Node</Name>
          <Title>Sluice Gate Controls</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>cross</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#06b6d4</CssParameter>
                </Fill>
                <Stroke>
                  <CssParameter name="stroke">#0891b2</CssParameter>
                  <CssParameter name="stroke-width">2.0</CssParameter>
                </Stroke>
              </Mark>
              <Size>12</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
