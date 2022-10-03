import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Drawer from 'features/drawer/drawer';
import Dialog from 'features/dialog/dialog';
import PageLayout from 'components/pageLayout';
import SearchBar from 'features/search/searchBar';
import { deepOrange } from '@mui/material/colors';
import SearchList from 'features/search/searchList';

// overwrite default theme
const theme = createTheme({
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
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout
        renderHeader={<SearchBar />}
        renderTopContent={<div>whats up</div>}
      >
        <SearchList />
      </PageLayout>
      <Drawer />
      <Dialog />
    </ThemeProvider>
  );
}

export default App;
