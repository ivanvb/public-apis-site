import React from 'react';
import csv from '../../data/public-apis-dump.csv';
import { useLocalStorage } from '../hooks/useLocalStorage';

const categoriesValues = new Set();
const authValues = new Set();
const httpsValues = ['Yes', 'No'];
const corsValues = ['Yes', 'No'];

let currentCategory = '';
const flatData = csv.map((resource) => {
    const [category, title, url, description, auth, https, cors] = resource;
    if (category.length > 0) {
        currentCategory = category;
        categoriesValues.add(currentCategory);
    }
    authValues.add(auth);

    return {
        category: currentCategory,
        title,
        url,
        description,
        auth,
        https,
        cors,
    };
});

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
    const [selectedData, setSelectedData] = React.useState(flatData);

    const [selectedFilters, setSelectedFilters] = useLocalStorage(
        'selectedFilters',
        initialFilterState
    );

    function resetFilter() {
        setSelectedFilters({ ...initialFilterState });
    }

    return (
        <ApplicationContext.Provider
            value={{
                filter: {
                    filters,
                    selectedFilters,
                    setSelectedFilters,
                    resetFilter,
                },
                data: selectedData,
            }}
        >
            {props.children}
        </ApplicationContext.Provider>
    );
};
