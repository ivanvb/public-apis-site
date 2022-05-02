import React from 'react';
import { Box, IconButton, ClickAwayListener } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterMenuModal from './FilterMenuModal';

const FilterMenu = ({ filters }) => {
    const [showFilter, setShowFilter] = React.useState(false);

    function closeFilter() {
        setShowFilter(false);
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setShowFilter((prev) => !prev)}>
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
