import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

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
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <nav>
            <Link to='/'>Readers</Link>|
            <Link to='books'>Books</Link>|
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
  );
};

export default App;
