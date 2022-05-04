import React from 'react';
import csv from '../../data/public-apis-dump.csv';
import { csvApiDataToJson, itemPassesPropertyFilter } from '../utils';
import { useLocalStorage } from '../hooks/useLocalStorage';

const {
    mappedData: flatData,
    categoriesValues,
    authValues,
    httpsValues,
    corsValues,
} = csvApiDataToJson(csv);

const filters = [
    {
        name: 'Categories',
        values: [...categoriesValues].sort((a, b) => a.localeCompare(b)),
    },
    {
        name: 'Auth',
        values: [...authValues].sort((a, b) => a.localeCompare(b)),
    },
    {
        name: 'Https',
        values: httpsValues,
    },
    {
        name: 'Cors',
        values: corsValues,
    },
];

const initialFilterState = filters.reduce((acc, curr) => {
    return { ...acc, [curr.name]: {} };
}, {});

export const ApplicationContext = React.createContext();
export const ApplicationProvider = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [selectedFilters, setSelectedFilters] = useLocalStorage(
        'selectedFilters',
        initialFilterState
    );

    const filteredData = React.useCallback(
        flatData.filter((item) => {
            const { Categories, Auth, Cors, Https } = selectedFilters;

            const passesCategoryFilter = itemPassesPropertyFilter(item.category, Categories);
            const passesAuthFilter = itemPassesPropertyFilter(item.auth, Auth);
            const passesCorsFilter = itemPassesPropertyFilter(item.cors, Cors);
            const passesHttpsFilter = itemPassesPropertyFilter(item.https, Https);

            return (
                passesCategoryFilter && passesAuthFilter && passesCorsFilter && passesHttpsFilter
            );
        }),
        [selectedFilters]
    );

    function resetFilter() {
        setSelectedFilters({ ...initialFilterState });
    }

    React.useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <ApplicationContext.Provider
            value={{
                filter: {
                    filters,
                    selectedFilters,
                    setSelectedFilters,
                    resetFilter,
                },
                data: {
                    filteredData,
                },
                state: {
                    loading,
                },
            }}
        >
            {props.children}
        </ApplicationContext.Provider>
    );
};
