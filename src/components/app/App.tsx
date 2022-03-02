import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

import Login from './Login';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';


// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
export const link = createHttpLink({
  uri: 'http://localhost:3030/graphql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const theme = createTheme({
  direction: 'rtl',
});

const App: React.FC = () => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Login />
          <BrowserRouter>
            <nav>
              <Link to='/'>Readers</Link>|<Link to='books'>Books</Link>|
              <Link to='authors'>Authors</Link>
            </nav>
            <Routes>
              <Route path='/' element={<ReadersMangement />} />
              <Route path='authors/*' element={<AuthorsMangement />} />
              <Route path='books/*' element={<BooksMangement />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
