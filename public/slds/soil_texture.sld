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
      <Title>Soil Texture Classification Style</Title>
      <Abstract>Soil Texture categorized colors spanning Sandy, Loamy, Clayey, and Alluvial textures across Assam</Abstract>
      <FeatureTypeStyle>
        <!-- Rule 1: Sandy Soil -->
        <Rule>
          <Name>Sandy Soil</Name>
          <Title>Sandy Soil</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>texture</ogc:PropertyName>
              <ogc:Literal>Sandy</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#fdd835</CssParameter>
              <CssParameter name="fill-opacity">0.75</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#fbc02d</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <!-- Rule 2: Loamy Soil -->
        <Rule>
          <Name>Loamy Soil</Name>
          <Title>Loamy Soil</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>texture</ogc:PropertyName>
              <ogc:Literal>Loamy</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#a1887f</CssParameter>
              <CssParameter name="fill-opacity">0.75</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#8d6e63</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <!-- Rule 3: Clayey Soil -->
        <Rule>
          <Name>Clayey Soil</Name>
          <Title>Clayey Soil</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>texture</ogc:PropertyName>
              <ogc:Literal>Clayey</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#81c784</CssParameter>
              <CssParameter name="fill-opacity">0.75</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#66bb6a</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <!-- Rule 4: Alluvial Soil -->
        <Rule>
          <Name>Alluvial Soil</Name>
          <Title>Alluvial Soil</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>texture</ogc:PropertyName>
              <ogc:Literal>Alluvial</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#4db6ac</CssParameter>
              <CssParameter name="fill-opacity">0.75</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#26a69a</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <!-- Rule 5: Default Fallback -->
        <Rule>
          <Name>Other Soil</Name>
          <Title>Other / Unclassified</Title>
          <ogc:Filter>
            <ogc:PropertyIsExactlyNull>
              <ogc:PropertyName>texture</ogc:PropertyName>
            </ogc:PropertyIsExactlyNull>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#e0e0e0</CssParameter>
              <CssParameter name="fill-opacity">0.5</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#9e9e9e</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
