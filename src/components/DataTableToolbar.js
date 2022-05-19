import React from 'react';
import { Box, TextField, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import FilterMenu from './FilterMenu';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchField = ({ isMobile }) => {
    return (
        <TextField
            label="Search"
            variant={isMobile ? 'outlined' : 'standard'}
            sx={{ width: isMobile ? '100%' : '245px', marginTop: isMobile ? 2 : 0 }}
        />
    );
};

const DataTableToolbar = ({ title }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Toolbar
            sx={{
                padding: '20px 12px 12px 12px !important',
                background: theme.palette.background.darker,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography variant="h5">{title}</Typography>
            <Box sx={{ display: 'flex' }}>
                {!isMobile && <SearchField isMobile={isMobile} />}
                <FilterMenu />
            </Box>
            {isMobile && <SearchField isMobile={isMobile} />}
        </Toolbar>
    );
};

export default DataTableToolbar;
