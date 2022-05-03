import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import DataTable from './DataTable';

const ApisTable = () => {
    const { data } = useContext(ApplicationContext);

    return (
        <>
            <DataTable
                headings={['Title', 'Description', 'Category', 'Auth', 'Https', 'Cors']}
                rows={data.slice(0, 20)}
            />
        </>
    );
};

export default ApisTable;
