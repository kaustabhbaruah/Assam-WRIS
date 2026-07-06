<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>lulc</Name>
    <UserStyle>
      <Title>Standard Global LULC Palette</Title>
      <Abstract>Professional categorical styling for Land Use/Land Cover datasets with optimized thin borders.</Abstract>
      <FeatureTypeStyle>

        <Rule>
          <Name>Aquaculture / pisciculture</Name>
          <Title>Aquaculture / pisciculture</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Aquaculture / pisciculture</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#4FC3F7</CssParameter>
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
          <Name>Built up</Name>
          <Title>Built up</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Built up</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#E53935</CssParameter>
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
            <Name>Canal</Name>
            <Title>Canal</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>LU_Class</ogc:PropertyName>
                <ogc:Literal>Canal</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#2196F3</CssParameter>
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
            <Name>Crop land</Name>
            <Title>Crop land</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>LU_Class</ogc:PropertyName>
                <ogc:Literal>Crop land</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#FDD835</CssParameter>
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
            <Name>Forest</Name>
            <Title>Forest</Title>
            <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>LU_Class</ogc:PropertyName>
                <ogc:Literal>Forest</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Filter>
            <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#2E7D32</CssParameter>
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
          <Name>Grassland &amp; Grazing land</Name>
          <Title>Grassland &amp; Grazing land</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Grassland &amp; Grazing land</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#8BC34A</CssParameter>
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
          <Name>Lakes / Ponds</Name>
          <Title>Lakes / Ponds</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Lakes / Ponds</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#1565C0</CssParameter>
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
          <Name>Mining / industrial</Name>
          <Title>Mining / industrial</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Mining / industrial</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#795548</CssParameter>
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
          <Name>River / Stream / Drain</Name>
          <Title>River / Stream / Drain</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>River / Stream / Drain</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#00BCD4</CssParameter>
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
          <Name>River / Wetlands</Name>
          <Title>River / Wetlands</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>River / Wetlands</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#26A69A</CssParameter>
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
          <Name>Sandy areas</Name>
          <Title>Sandy areas</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Sandy areas</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#F4C87A</CssParameter>
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
          <Name>Scrub land</Name>
          <Title>Scrub land</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Scrub land</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#A1887F</CssParameter>
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
          <Name>Shifting Cultivation</Name>
          <Title>Shifting Cultivation</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Shifting Cultivation</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#FF9800</CssParameter>
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
          <Name>Transportation</Name>
          <Title>Transportation</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Transportation</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#424242</CssParameter>
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
          <Name>Waterlogged</Name>
          <Title>Waterlogged</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>LU_Class</ogc:PropertyName>
              <ogc:Literal>Waterlogged</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#7E57C2</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#616161</CssParameter>
              <CssParameter name="stroke-width">0.25</CssParameter>
              <CssParameter name="stroke-opacity">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        </FeatureTypeStyle>
      </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>