import React, { useContext } from 'react';
import FilterMenu from '../src/components/FilterMenu';
import { ApplicationContext } from '../src/context/ApplicationContext';

const Home = () => {
    const {
        filter: { filters },
    } = useContext(ApplicationContext);
    return (
        <>
            <FilterMenu filters={filters} />
            <p style={{ height: '300vh' }}>hello world!</p>
        </>
    );
};

export default Home;
