import { ThemeProvider } from '@emotion/react';
import Dialog from 'features/dialog/dialog';
import SearchBar from 'features/search/searchBar';
import SearchList from 'features/search/searchList';
import AppLayout from 'components/AppLayout';
import { theme } from 'themeConfig';
import SearchFilterForm from 'features/search/searchFilterForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout
        header={<SearchBar />}
        sidebar={<SearchFilterForm />}
        content={<SearchList />}
      />
      <Dialog />
    </ThemeProvider>
  );
}

export default App;
