import React, { useContext } from 'react';
import { Box, IconButton, ClickAwayListener } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterMenuModal from './FilterMenuModal';
import { ApplicationContext } from '../context/ApplicationContext';

const FilterMenu = () => {
    const {
        filter: { filters },
    } = useContext(ApplicationContext);
    const [showFilter, setShowFilter] = React.useState(false);

    function closeFilter() {
        setShowFilter(false);
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 20,
            }}
        >
            <IconButton sx={{ width: '50px' }} onClick={() => setShowFilter((prev) => !prev)}>
                <FilterListIcon />
            </IconButton>
            {showFilter && (
                <ClickAwayListener onClickAway={closeFilter}>
                    <FilterMenuModal onCloseIntent={closeFilter} filters={filters} />
                </ClickAwayListener>
            )}
        </Box>
    );
};

export default FilterMenu;
