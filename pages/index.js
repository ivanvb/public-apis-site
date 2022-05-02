import React from 'react';

const Home = () => {
    const filters = [
        {
            name: 'Categories',
            values: ['Animals', 'Space', 'Science', 'Programming'],
        },
        {
            name: 'Auth',
            values: ['No', 'Token', 'OAuth'],
        },
        {
            name: 'Https',
            values: ['Yes', 'No'],
        },
        {
            name: 'Cors',
            values: ['Yes', 'No'],
        },
    ];

    return (
        <>
            <p style={{ height: '300vh' }}>hello world!</p>
        </>
    );
};

export default Home;
