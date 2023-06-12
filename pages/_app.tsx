import {
  CssBaseline,
  LinearProgress,
  MuiThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import 'macro-css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import BottomNavigation from '../components/Mobile/BottomNavigation';
import { setUserData } from '../redux/slices/user';
import { wrapper } from '../redux/store';
import '../styles/globals.scss';
import { theme } from '../theme';
import { Api } from '../utils/api';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const isWideScreen = useMediaQuery('(max-width:767px)');
  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true)); // Обработка начала загрузки
    router.events.on('routeChangeComplete', () => setLoading(false)); // Обработка окончания загрузки
  }, []);
  return (
    <>
      <Head>
        <title>RJournal</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {loading && <LinearProgress color="primary" />}
        <Header />
        <Component {...pageProps} />
        {isWideScreen && <BottomNavigation />}
      </MuiThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getMe();
        store.dispatch(setUserData(userData));
      } catch (err) {
        // if (ctx.asPath === '/write') {
        //   ctx?.res?.writeHead(303, {
        //     Location: '/403',
        //   });
        //   ctx.res?.end();
        // }
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
