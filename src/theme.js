import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#00bafa' },
    secondary: { main: '#ff0056' },
    background: { paper: '#14223f', default: '#151836' },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#14223f',
        color: '#fff',
      },
    },
  },
});

export default theme;
