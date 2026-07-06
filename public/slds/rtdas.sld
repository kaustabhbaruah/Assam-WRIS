<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>rtdas</Name>
    <UserStyle>
      <Title>RTDAS Station Style</Title>
      <Abstract>Vibrant electric yellow telemetry stations with wide dark border for high-visibility real-time reporting.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>RTDAS Node</Name>
          <Title>RTDAS Station</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#eab308</CssParameter>
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
