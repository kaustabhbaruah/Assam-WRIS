<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>waterbodies_amrut</Name>
    <UserStyle>
      <Title>AMRUT Waterbodies Style</Title>
      <Abstract>Deep royal blue fill with clean borders representing AMRUT scheme waterbodies.</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Waterbody Polygons</Name>
          <Title>AMRUT Waterbodies</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#2563eb</CssParameter>
              <CssParameter name="fill-opacity">0.60</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#1d4ed8</CssParameter>
              <CssParameter name="stroke-width">1.2</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
