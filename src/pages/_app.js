import Head from 'next/head';
import {currentTheme} from '../theme';
import {ChakraProvider, extendTheme, useDisclosure} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider, Hydrate} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import './globals.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NoSSR from 'react-no-ssr';
import Preloader from '../components/common/preloader';
import SupportMenu from '../components/support/SupportMenu';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {getItemFromLS, setItemInLS} from '../utils/localStorage';
import {MY_PREFERRED_THEME} from '../constants/names';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function MyApp({Component, pageProps}) {
  const router = useRouter();
  const isAuthPage = router.pathname === `/` || router.pathname.indexOf('auth') !== -1;
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [theme, setTheme] = useState('light');
  const [customColors, setCustomColors] = useState({});

  const changeTheme = newTheme => {
    setTheme(newTheme);
    setItemInLS(MY_PREFERRED_THEME, newTheme);
  };

  const changeColors = colorObj => {
    setCustomColors({...customColors, ...colorObj});
  };

  useEffect(() => {
    // const my_preferred_theme = getItemFromLS(MY_PREFERRED_THEME);
    // if (my_preferred_theme) {
    //   setTheme(my_preferred_theme);
    // } else {
    setItemInLS(MY_PREFERRED_THEME, 'light');
    // }
  }, []);

  const CURRENT_THEME = currentTheme(theme);

  return (
    <ChakraProvider
      theme={extendTheme({
        ...CURRENT_THEME,
        theme_name: theme,
        colors: {
          ...CURRENT_THEME.colors,
          ...customColors,
          theme_name: theme,
        },
      })}
    >
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Terracota Construction Limited - Terracota Construction Limited</title>
          <meta
            name="description"
            content="Mainstone is a a construction company with a clear vision to create contemporary and urban living for discerning individuals within small communities / Estates."
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=League+Spartan:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <NoSSR onSSR={<Preloader />}>
          <Hydrate state={pageProps.dehydratedState}>
            <React.StrictMode>
              <Component
                {...pageProps}
                currentTheme={theme}
                changeTheme={changeTheme}
                changeColors={changeColors}
              />
            </React.StrictMode>
          </Hydrate>
        </NoSSR>

        {/* {isAuthPage ? null : <SupportMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} />} */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
