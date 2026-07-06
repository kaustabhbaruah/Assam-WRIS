<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>flood_layer_2024</Name>
    <UserStyle>
      <Title>Flood Inundation Style</Title>
      <Abstract>Vibrant semi-transparent cyan fill with crisp outline representing flooded inundation boundaries.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Flood Extent</Name>
          <Title>Flood Inundation</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#06b6d4</CssParameter>
              <CssParameter name="fill-opacity">0.55</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#0891b2</CssParameter>
              <CssParameter name="stroke-width">1.2</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
