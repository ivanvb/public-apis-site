import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const filters = [
    {
        name: 'Categories',
        values: ['Animals', 'Space', 'Science', 'Programming'],
    },
    {
        name: 'Auth',
        values: ['No', 'Token', 'OAuth'],
    },
    {
        name: 'Https',
        values: ['Yes', 'No'],
    },
    {
        name: 'Cors',
        values: ['Yes', 'No'],
    },
];

const initialFilterState = filters.reduce((acc, curr) => {
    return { ...acc, [curr.name]: {} };
}, {});

export const ApplicationContext = React.createContext();
export const ApplicationProvider = (props) => {
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
            }}
        >
            {props.children}
        </ApplicationContext.Provider>
    );
};
