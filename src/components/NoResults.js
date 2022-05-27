import React from 'react';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Typography, Box } from '@mui/material';

const NoResults = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <ErrorOutline sx={{ fontSize: '92px' }} />
            <Typography mt={1.5} variant="h5">
                No Results
            </Typography>
        </Box>
    );
};

export default NoResults;
