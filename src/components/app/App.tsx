import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { useSelector } from 'react-redux';

import Login from './login/Login';
import Navigator from './navigator/navigator';
import { RootState } from '../../redux/store';
import Reader from '../../models/reader';

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
  const auth = useSelector<RootState, Reader>((state) => state.auth.loginUser);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          {auth === undefined ? <Login /> : <Navigator />}
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
