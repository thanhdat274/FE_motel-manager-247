import '../assets/styles/globals.css';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';
import LayoutLandlords from 'src/Layout/Manager/Landlords';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Router.events.on('routeChangeStart', () => {
  //   setLoading(true);
  // });

  // Router.events.on('routeChangeComplete', () => {
  //   setLoading(false);
  // });

  if (router.pathname.search('/manager/landlord') >= 0) {
    return (
      <LayoutLandlords>
        <Component {...pageProps} />
      </LayoutLandlords>
    );
  }

  if (router.pathname.search('/manager/ternant') >= 0) {
    return (
      <LayoutLandlords>
        <Component {...pageProps} />
      </LayoutLandlords>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
