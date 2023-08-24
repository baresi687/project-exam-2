import { createContext, useState } from 'react';
import { useApi } from '../hooks/useApi.js';

export const DataAndSettingsContext = createContext([]);

function DataAndSettingsProvider({ children }) {
  const { data, isLoading, isError, fetchData, created } = useApi();
  const [sort, setSort] = useState(true);
  const [sortOrder, setSortOrder] = useState(true);
  const [isVenueSectionActive, setIsVenueSectionActive] = useState(true);

  return (
    <DataAndSettingsContext.Provider
      value={[
        data,
        isLoading,
        isError,
        fetchData,
        created,
        isVenueSectionActive,
        setIsVenueSectionActive,
        sort,
        setSort,
        sortOrder,
        setSortOrder,
      ]}
    >
      {children}
    </DataAndSettingsContext.Provider>
  );
}

export default DataAndSettingsProvider;
