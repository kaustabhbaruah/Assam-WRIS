<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>soil_texture</Name>
    <UserStyle>
      <Title>Soil Texture Style</Title>
      <Abstract>Warm earthy-brown translucent polygon fill representing agricultural and geological soil classification.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Soil Polygons</Name>
          <Title>Soil Textures</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#b45309</CssParameter>
              <CssParameter name="fill-opacity">0.30</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#78350f</CssParameter>
              <CssParameter name="stroke-width">1.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
