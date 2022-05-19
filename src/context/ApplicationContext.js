import React, { useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import csv from '../../data/public-apis-dump.csv';
import {
    csvApiDataToJson,
    itemPassesPropertyFilter,
    parseQueryString,
    filtersToQueryString,
    itemPassesSearchFilter,
} from '../utils';
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
    const [selectedFilters, setSelectedFilters] = useQueryState('selectedFilters', {
        ...queryTypes.json(),
        defaultValue: initialFilterState,
        parse: parseQueryString,
        serialize: filtersToQueryString,
    });
    const [liked, setLiked] = useLocalStorage('liked', {});
    const [search, setSearch] = useState('');

    const filteredData = React.useCallback(
        flatData.filter((item) => {
            const { Categories, Auth, Cors, Https } = selectedFilters;

            const passesCategoryFilter = itemPassesPropertyFilter(item.category, Categories);
            const passesAuthFilter = itemPassesPropertyFilter(item.auth, Auth);
            const passesCorsFilter = itemPassesPropertyFilter(item.cors, Cors);
            const passesHttpsFilter = itemPassesPropertyFilter(item.https, Https);
            const passesSearchFilter = itemPassesSearchFilter(item, search);

            return (
                passesCategoryFilter &&
                passesAuthFilter &&
                passesCorsFilter &&
                passesHttpsFilter &&
                passesSearchFilter
            );
        }),
        [selectedFilters, search]
    );

    const numberOfSelectedFilters = React.useCallback(
        Object.values(selectedFilters).reduce((total, filterCategory) => {
            return total + Object.entries(filterCategory).filter((isSelected) => isSelected).length;
        }, 0),
        [selectedFilters]
    );

    function resetFilter() {
        setSelectedFilters({ ...initialFilterState });
    }

    React.useEffect(() => {
        setLoading(false);
    }, []);

    function addLike(id) {
        setLiked((prev) => {
            return { ...prev, [id]: true };
        });
    }

    function removeLike(id) {
        setLiked((prev) => {
            return { ...prev, [id]: false };
        });
    }

    return (
        <ApplicationContext.Provider
            value={{
                filter: {
                    filters,
                    selectedFilters,
                    setSelectedFilters,
                    resetFilter,
                    search,
                    setSearch,
                    numberOfSelectedFilters,
                },
                data: {
                    filteredData,
                },
                state: {
                    loading,
                },
                likes: {
                    liked,
                    addLike,
                    removeLike,
                },
            }}
        >
            {props.children}
        </ApplicationContext.Provider>
    );
};
