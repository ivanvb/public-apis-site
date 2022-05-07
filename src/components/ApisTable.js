import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import DataTable from './DataTable';

const ApisTable = () => {
    const {
        data: { filteredData },
        state: { loading },
    } = useContext(ApplicationContext);

    return (
        <>
            {loading === false && (
                <DataTable
                    headings={['Title', 'Description', 'Category', 'Auth', 'Https', 'Cors']}
                    rows={filteredData}
                />
            )}
        </>
    );
};

export default ApisTable;
