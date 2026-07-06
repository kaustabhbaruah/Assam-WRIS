<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>reserve_forests</Name>
    <UserStyle>
      <Title>Reserve Forests Style</Title>
      <Abstract>Deep forest green semi-transparent polygon fill, representing ecologically protected state reserves.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Reserve Forest Areas</Name>
          <Title>Reserve Forests</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#15803d</CssParameter>
              <CssParameter name="fill-opacity">0.35</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#166534</CssParameter>
              <CssParameter name="stroke-width">1.0</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
