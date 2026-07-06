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
      <Title>Standard Global Soil Texture Palette</Title>
      <Abstract>Optimized for visibility across Light, Dark, and Imagery basemaps.</Abstract>
      <FeatureTypeStyle>

        <Rule>
          <Name>Clay</Name>
          <Title>Clay</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TEXTURE</ogc:PropertyName>
              <ogc:Literal>Clay</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#9C4126</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#616161</CssParameter>
              <CssParameter name="stroke-width">0.25</CssParameter>
              <CssParameter name="stroke-opacity">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Name>Loamy</Name>
          <Title>Loamy</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TEXTURE</ogc:PropertyName>
              <ogc:Literal>Loamy</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#BC8F62</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#616161</CssParameter>
              <CssParameter name="stroke-width">0.25</CssParameter>
              <CssParameter name="stroke-opacity">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
          </Rule>

          <Rule>
            <Name>Loamy sand</Name>
            <Title>Loamy sand</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>TEXTURE</ogc:PropertyName>
                <ogc:Literal>Loamy sand</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#E6CA94</CssParameter>
                <CssParameter name="fill-opacity">0.85</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#616161</CssParameter>
                <CssParameter name="stroke-width">0.25</CssParameter>
                <CssParameter name="stroke-opacity">0.3</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
          </Rule>

          <Rule>
            <Name>Sand</Name>
            <Title>Sand</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>TEXTURE</ogc:PropertyName>
                <ogc:Literal>Sand</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#F5E6B3</CssParameter>
                <CssParameter name="fill-opacity">0.85</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#616161</CssParameter>
                <CssParameter name="stroke-width">0.25</CssParameter>
                <CssParameter name="stroke-opacity">0.3</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
          </Rule>

          <Rule>
            <Name>Sandy loam</Name>
            <Title>Sandy loam</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>TEXTURE</ogc:PropertyName>
                <ogc:Literal>Sandy loam</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#DEB887</CssParameter>
                <CssParameter name="fill-opacity">0.85</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#616161</CssParameter>
                <CssParameter name="stroke-width">0.25</CssParameter>
                <CssParameter name="stroke-opacity">0.3</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
          </Rule>

          <Rule>
          <Name>Silt</Name>
          <Title>Silt</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TEXTURE</ogc:PropertyName>
              <ogc:Literal>Silt</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#9EA080</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#616161</CssParameter>
              <CssParameter name="stroke-width">0.25</CssParameter>
              <CssParameter name="stroke-opacity">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>


        <Rule>
          <Name>Silty clay</Name>
          <Title>Silty clay</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TEXTURE</ogc:PropertyName>
              <ogc:Literal>Silty clay</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#7D5C43</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#616161</CssParameter>
              <CssParameter name="stroke-width">0.25</CssParameter>
              <CssParameter name="stroke-opacity">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>


        <Rule>
            <Name>Other</Name>
            <Title>Other / Unclassified</Title>
            <ElseFilter/>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#EAEAEA</CssParameter>
                <CssParameter name="fill-opacity">0.60</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#999999</CssParameter>
                <CssParameter name="stroke-width">0.5</CssParameter>
                <CssParameter name="stroke-opacity">0.5</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
          </Rule>

        </FeatureTypeStyle>
      </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>