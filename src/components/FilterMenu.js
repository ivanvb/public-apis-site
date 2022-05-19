import React, { useContext } from 'react';
import { Box, IconButton, ClickAwayListener, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterMenuModal from './FilterMenuModal';
import { ApplicationContext } from '../context/ApplicationContext';

const FilterMenu = () => {
    const {
        filter: { filters, numberOfSelectedFilters },
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
                <Badge
                    badgeContent={numberOfSelectedFilters}
                    color="primary"
                    sx={{ opacity: showFilter ? 0 : 1 }}
                >
                    <FilterListIcon />
                </Badge>
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
