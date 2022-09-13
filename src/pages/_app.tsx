import '../assets/styles/globals.css';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';
import LayoutLandlords from 'src/Layout/Manager/Landlords';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import LayoutTenants from 'src/Layout/Manager/Tenants';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Router.events.on('routeChangeStart', () => {
  //   setLoading(true);
  // });

  // Router.events.on('routeChangeComplete', () => {
  //   setLoading(false);
  // });

  if (router.pathname.search('/manager/landlord/list-home') >= 0) {
    return <Component {...pageProps} />;
  }

  if (router.pathname.search('/manager/landlord') >= 0) {
    return (
      <LayoutLandlords>
        {loading ? (
          <ReactLoading type={'spinningBubbles'} color="red" width={300} height={300} />
        ) : (
          <Component {...pageProps} />
        )}
      </LayoutLandlords>
    );
  }

  if (router.pathname.search('/manager/ternant') >= 0) {
    return (
      <LayoutTenants>
        <Component {...pageProps} />
      </LayoutTenants>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
