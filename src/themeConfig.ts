import { createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

// overwrite default theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: deepOrange,
    background: {
      default: '#eff3f6',
    },
    text: {
      primary: '#374957',
    },
  },
  typography: {
    fontFamily: ['Rubik', 'serif'].join(','),
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          borderRadius: 0,
        },
        track: {
          borderRadius: 0,
        },
      },
    },
  },
});
