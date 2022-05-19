import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import DataTable from './DataTable';

const ApisTable = () => {
    const {
        data: { filteredData },
        state: { loading },
        likes: { liked, addLike, removeLike },
    } = useContext(ApplicationContext);

    return (
        <>
            {loading === false && (
                <DataTable
                    headings={['Title', 'Description', 'Category', 'Auth', 'Https', 'Cors']}
                    rows={filteredData}
                    liked={liked}
                    onLike={addLike}
                    onRemoveLike={removeLike}
                />
            )}
        </>
    );
};

export default ApisTable;
