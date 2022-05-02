import React from 'react';
import FilterMenu from '../src/components/FilterMenu';

const Home = () => {
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

    return (
        <>
            <FilterMenu filters={filters} />
            <p style={{ height: '300vh' }}>hello world!</p>
        </>
    );
};

export default Home;
