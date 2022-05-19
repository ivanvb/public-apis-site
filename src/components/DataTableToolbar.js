import React, { useContext } from 'react';
import { Box, TextField, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import FilterMenu from './FilterMenu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ApplicationContext } from '../context/ApplicationContext';

const SearchField = ({ isMobile, value, onChange }) => {
    return (
        <TextField
            label="Search"
            variant={isMobile ? 'outlined' : 'standard'}
            sx={{ width: isMobile ? '100%' : '245px', marginTop: isMobile ? 2 : 0 }}
            value={value}
            onChange={onChange}
        />
    );
};

const DataTableToolbar = ({ title }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {
        filter: { search, setSearch },
    } = useContext(ApplicationContext);

    function handleChange(e) {
        setSearch(e.target.value);
    }
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
                {!isMobile && (
                    <SearchField value={search} onChange={handleChange} isMobile={isMobile} />
                )}
                <FilterMenu />
            </Box>
            {isMobile && <SearchField value={search} onChange={handleChange} isMobile={isMobile} />}
        </Toolbar>
    );
};

export default DataTableToolbar;
