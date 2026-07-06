<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>protected_areas</Name>
    <UserStyle>
      <Title>Protected Areas Style</Title>
      <Abstract>Translucent olive green polygon fill with a distinct green boundary for sanctuaries and national parks.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Protected Areas</Name>
          <Title>Protected Areas</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#4d7c0f</CssParameter>
              <CssParameter name="fill-opacity">0.40</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#3f6212</CssParameter>
              <CssParameter name="stroke-width">1.2</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
