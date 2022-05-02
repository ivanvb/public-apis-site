import React, { forwardRef, useContext } from 'react';
import { Box, IconButton, Paper, MenuItem, Typography, Checkbox, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAccordion from './FilterAccordion';
import useLockBodyScroll from '../hooks/useBodyLock';
import { ApplicationContext } from '../context/ApplicationContext';

const FilterMenuModal = forwardRef(({ filters, onCloseIntent }, ref) => {
    useLockBodyScroll();
    const {
        filter: { selectedFilters, setSelectedFilters, resetFilter },
    } = useContext(ApplicationContext);

    function toggleCheck(category, item) {
        setSelectedFilters((prev) => {
            const copy = JSON.parse(JSON.stringify(prev));
            copy[category][item] = prev[category][item] ? false : true;
            return { ...copy };
        });
    }

    function getSelectedFiltersPerCategory(categoryName) {
        return Object.entries(selectedFilters[categoryName]).reduce((acc, curr) => {
            const [_, val] = curr;

            return val ? ++acc : acc;
        }, 0);
    }

    return (
        <Paper
            sx={{
                width: {
                    xs: '100%',
                    md: 500,
                },
                maxHeight: {
                    md: 500,
                },
                position: 'absolute',
                top: {
                    xs: 0,
                    md: 48,
                },
                height: {
                    xs: '100%',
                    md: 'auto',
                },
                overflowY: 'auto',
                pt: 3,
            }}
            ref={ref}
        >
            <Box
                sx={{
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <IconButton
                    sx={{
                        display: {
                            xs: 'block',
                            md: 'none',
                        },
                        height: 40,
                        width: 40,
                        right: 18,
                        position: 'absolute',
                        top: 12,
                    }}
                    onClick={onCloseIntent}
                >
                    <CloseIcon />
                </IconButton>
                <Box
                    sx={{
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mt: {
                            xs: 3,
                            md: 0,
                        },
                    }}
                >
                    <Typography sx={{ fontWeight: 900 }} variant="h6">
                        Filter
                    </Typography>
                    <Button onClick={resetFilter} color="error">
                        Reset
                    </Button>
                </Box>
            </Box>

            {filters.map((filter, i) => {
                const numberOfSelectedBadges = getSelectedFiltersPerCategory(filter.name);
                return (
                    <FilterAccordion
                        key={i}
                        title={filter.name}
                        selectedItems={numberOfSelectedBadges}
                    >
                        {filter.values.map((value, j) => {
                            return (
                                <MenuItem
                                    key={j}
                                    sx={{ px: 2 }}
                                    onClick={() => toggleCheck(filter.name, value)}
                                >
                                    <Checkbox
                                        checked={Boolean(selectedFilters[filter.name][value])}
                                    />
                                    {value}
                                </MenuItem>
                            );
                        })}
                    </FilterAccordion>
                );
            })}
        </Paper>
    );
});

FilterMenuModal.displayName = 'FilterMenuModal';
export default FilterMenuModal;
