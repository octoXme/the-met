import { Counter } from './features/counter/Counter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Drawer from 'features/drawer/drawer';
import Dialog from 'features/dialog/dialog';
import PageLayout from 'components/pageLayout';

// overwrite default theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#e4002b',
    },
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
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout
        renderHeader={<div>hahahhaha</div>}
        renderTopContent={<div>whats up</div>}
        children={<div>children</div>}
      />
      <Counter />
      <Drawer />
      <Dialog />
    </ThemeProvider>
  );
}

export default App;
