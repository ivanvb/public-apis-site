import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFDE01',
            contrastText: '#000',
            dark: '#ff00ff',
        },
        secondary: {
            main: '#E25141',
        },
        tertiary: {
            main: '#2F3033',
            contrastText: '#fff',
        },
        background: {
            default: '#1A2027',
            paper: '#111216',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgb(118, 126, 135)',
            // hint: 'rgba(255, 255, 255, 0.38)',
            disabled: '#ffffff',
        },
    },
    components: {
        // Name of the component ⚛️
        MuiButtonBase: {
            defaultProps: {
                // The props to apply
                disableRipple: false, // No more ripple, on the whole application 💣!
            },
        },
    },
    typography: {
        h1: {
            fontSize: '3rem',
            fontWeight: 900,
        },
        h6: {
            fontSize: '1.3rem',
            fontWeight: 900,
        },
        h2: {
            fontSize: '2.6rem',
            fontWeight: 900,
        },
        h3: {
            fontSize: '2.2rem',
            fontWeight: 900,
        },
        h4: {
            fontSize: '2rem',
            fontWeight: 900,
        },
    },
});

export default theme;
