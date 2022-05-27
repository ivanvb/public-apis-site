import React, { useContext, useMemo } from 'react';
import { Typography } from '@mui/material';
import { ApplicationContext } from '../context/ApplicationContext';

const styles = {
    fontSize: {
        xs: '24px',
        md: '36px',
    },
};

const TitleBar = ({ title }) => {
    const {
        filter: { filters },
    } = useContext(ApplicationContext);
    const categories = useMemo(
        () =>
            filters
                .find((f) => f.name === 'Categories')
                .values.map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value),
        []
    );

    return (
        <>
            <Typography
                variant="h1"
                component="h2"
                align="center"
                sx={{ textTransform: 'capitalize', ...styles }}
            >
                {title}
                <Typography
                    variant="h1"
                    component="span"
                    align="center"
                    mb={8}
                    color="primary"
                    sx={{ ...styles, display: 'block' }}
                >
                    {categories[0]}
                </Typography>
            </Typography>
        </>
    );
};

export default TitleBar;
