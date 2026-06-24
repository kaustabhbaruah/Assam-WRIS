<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>flood_layer</Name>
    <UserStyle>
      <Title>Flood Inundation Style</Title>
      <Abstract>Highly visible semi-transparent cyan water-blue fill representing sat-mapped flood extent</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Flood Inundation Extent</Name>
          <Title>Flood Inundation Extent</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#06b6d4</CssParameter>
              <CssParameter name="fill-opacity">0.65</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#0891b2</CssParameter>
              <CssParameter name="stroke-width">1.5</CssParameter>
              <CssParameter name="stroke-dasharray">3 2</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
