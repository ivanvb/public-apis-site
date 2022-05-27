import React, { useContext } from 'react';
import { Box, IconButton, ClickAwayListener, Badge, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import LikedIcon from "@mui/icons-material/Favorite"
import FilterMenuModal from './FilterMenuModal';
import { ApplicationContext } from '../context/ApplicationContext';

const FilterMenu = () => {
    const {
        filter: { filters, numberOfSelectedFilters },
        likes: { likedFilter, toggleLikedFilter }
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
                alignItems: 'center'
            }}
        >
            <Tooltip title={likedFilter ? 'Show all' :  'Show liked items' }>
                <IconButton sx={{ width: '35px', height: '35px', mt: {
                    xs: 0,
                    md: 0.5
                } }} onClick={toggleLikedFilter}>
                        <LikedIcon color={likedFilter ? 'primary': ''}/>
                </IconButton>
            </Tooltip>
            <IconButton sx={{ width: '40px' }} onClick={() => setShowFilter((prev) => !prev)}>
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
