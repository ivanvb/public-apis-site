import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import FilterMenu from './FilterMenu';

const DataTableToolbar = ({ title }) => {
    const theme = useTheme();

    return (
        <Toolbar
            sx={{
                padding: '12px !important',
                background: theme.palette.background.darker,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="h5">{title}</Typography>
            <FilterMenu />
        </Toolbar>
    );
};

export default DataTableToolbar;
