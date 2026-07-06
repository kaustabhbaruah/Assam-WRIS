<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>nhp_rtdas</Name>
    <UserStyle>
      <Title>NHP RTDAS Station Style</Title>
      <Abstract>Electric emerald telemetry stations under NHP scheme, with dark border for prominent mapping.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>NHP RTDAS Node</Name>
          <Title>NHP RTDAS Station</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#10b981</CssParameter>
                </Fill>
                <Stroke>
                  <CssParameter name="stroke">#1e293b</CssParameter>
                  <CssParameter name="stroke-width">1.8</CssParameter>
                </Stroke>
              </Mark>
              <Size>10</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
