import '../assets/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';
import LayoutLandlords from 'src/Layout/Manager/Landlords';
import LayoutTenants from 'src/Layout/Manager/Tenants';
import LayoutIntro from 'src/Layout/Preview';
import LayoutListHome from 'src/Layout/ListHome';
import UserProvider from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const switchLayout = () => {
    if (router.pathname.search('/manager/landlord/list-home') >= 0) {
      return (
        <LayoutListHome>
          <Component {...pageProps} />
        </LayoutListHome>
      );
    }

    if (router.pathname.search('/manager/landlord') >= 0) {
      return (
        <LayoutLandlords>
          <Component {...pageProps} />
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
      return (
        <div className="bg-gray-200">
          <LayoutIntro>
            <Component {...pageProps} />
          </LayoutIntro>
        </div>
      );
    }
  };

  return (
    <UserProvider>
      {switchLayout()}
      <ToastContainer />
    </UserProvider>
  );
}

export default MyApp;
