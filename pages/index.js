import React from 'react';
import ApiTable from '../src/components/ApisTable';
import { Container } from '@mui/material';

const Home = () => {
    return (
        <Container sx={{ pt: 3 }}>
            <ApiTable />
        </Container>
    );
};

export default Home;
