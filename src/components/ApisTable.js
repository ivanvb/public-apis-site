import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import DataTable from './DataTable';

const headings = ['Title', 'Description', 'Category', 'Auth', 'Https', 'Cors'];
const ApisTable = () => {
    const {
        data: { filteredData },
        state: { loading },
        likes: { liked, addLike, removeLike },
        filter: { search },
    } = useContext(ApplicationContext);

    return (
        <>
            {loading === false && (
                <DataTable
                    headings={headings}
                    rows={filteredData}
                    liked={liked}
                    onLike={addLike}
                    search={search}
                    onRemoveLike={removeLike}
                />
            )}
        </>
    );
};

export default ApisTable;
