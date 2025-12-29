import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bafa' },
    secondary: { main: '#ff0056' },
    background: { paper: '#14223f', default: '#151836' },
  },
  typography: {
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#14223f',
          backgroundImage: 'none',
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
