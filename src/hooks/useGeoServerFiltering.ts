import { useState, useCallback, useEffect } from 'react';

export const useGeoServerFiltering = (layerKey: string | null) => {
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [uniqueValues, setUniqueValues] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<any>('');
  const [cqlFilter, setCqlFilter] = useState<string>('');
  const [isLoadingFields, setIsLoadingFields] = useState(false);
  const [isLoadingValues, setIsLoadingValues] = useState(false);

  // Fetch Fields
  useEffect(() => {
    if (!layerKey) {
      setAvailableFields([]);
      setSelectedField('');
      setUniqueValues([]);
      setSelectedValue('');
      setCqlFilter('');
      return;
    }

    const fetchFields = async () => {
      setIsLoadingFields(true);
      try {
        const response = await fetch(`/api/geoserver/wfs?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=${layerKey}&outputFormat=application/json`);
        const data = await response.json();
        // Assuming structure based on WFS DescribeFeatureType output
        const fields = data.featureTypes?.[0]?.properties?.map((p: any) => p.name) || [];
        // Dynamically ignore geometry/system fields
        const ignoredFields = ['geom', 'the_geom', 'geometry', 'Shape_Leng', 'Shape_Area', 'OBJECTID', 'gid', 'fid', 'id'];
        setAvailableFields(fields.filter((f: string) => !ignoredFields.includes(f)));
      } catch (err) {
        console.error("Error fetching fields:", err);
      } finally {
        setIsLoadingFields(false);
      }
    };
    fetchFields();
  }, [layerKey]);

  // Fetch Values
  useEffect(() => {
    if (!layerKey || !selectedField) {
      setUniqueValues([]);
      setSelectedValue('');
      return;
    }

    const fetchValues = async () => {
      setIsLoadingValues(true);
      try {
        const response = await fetch(`/api/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=${layerKey}&propertyName=${selectedField}&outputFormat=application/json`);
        const data = await response.json();
        
        const values = new Set(data.features.map((f: any) => f.properties[selectedField]).filter((v: any) => v !== null && v !== undefined));
        setUniqueValues(Array.from(values).sort());
      } catch (err) {
        console.error("Error fetching values:", err);
      } finally {
        setIsLoadingValues(false);
      }
    };
    fetchValues();
  }, [layerKey, selectedField]);

  // Apply Filter
  useEffect(() => {
      if (selectedField && selectedValue) {
          // Construct basic CQL filter
          const filter = `${selectedField}='${selectedValue}'`;
          setCqlFilter(filter);
      } else {
          setCqlFilter('');
      }
  }, [selectedField, selectedValue]);

  const reset = useCallback(() => {
    setSelectedField('');
    setSelectedValue('');
    setCqlFilter('');
  }, []);

  return {
    availableFields,
    uniqueValues,
    selectedField,
    selectedValue,
    setSelectedField,
    setSelectedValue,
    cqlFilter,
    reset,
    isLoadingFields,
    isLoadingValues
  };
};
