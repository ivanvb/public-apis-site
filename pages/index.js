import React from 'react';
import ApiTable from '../src/components/ApisTable';
import { Container } from '@mui/material';
import TitleBar from '../src/components/TitleBar';

const Home = () => {
    return (
        <Container sx={{ pt: 8 }}>
            <TitleBar title="Find your next side project About" />
            <ApiTable />
        </Container>
    );
};

export default Home;
