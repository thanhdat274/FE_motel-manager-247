import '../assets/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core';
import LayoutLandlords from 'src/Layout/Manager/Landlords';
import LayoutTenants from 'src/Layout/Manager/Tenants';
import LayoutIntro from 'src/Layout/Preview';
import LayoutListHome from 'src/Layout/ListHome';
import UserProvider from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CookiesProvider } from 'react-cookie';
import { CheckCodeRoom, CheckUser, PrivateRouter } from './PrivateRouter';
import { useEffect, useState } from 'react';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  console.error = () => { };
  const switchLayout = () => {
    if (router.pathname.search('/manager/landlord/list-home') >= 0) {
      return (
        <div>
          <PrivateRouter>
            <LayoutListHome>
              <Component {...pageProps} />
            </LayoutListHome>
          </PrivateRouter>
        </div>
      );
    }

    if (router.pathname.search('/manager/landlord') >= 0) {
      return (
        <div>
          <PrivateRouter>
            <LayoutLandlords>
              <Component {...pageProps} />
            </LayoutLandlords>
          </PrivateRouter>
        </div>
      );
    }

    if (router.pathname.search('/manager/ternant') >= 0) {
      return (
        <div>
          <LayoutTenants>
            <Component {...pageProps} />
          </LayoutTenants>
        </div>
      );
    }
    else {
      return (
        <div className="bg-gray-200">
          <LayoutIntro>
            <CheckCodeRoom>
              <CheckUser>
                <Component {...pageProps} />
              </CheckUser>
            </CheckCodeRoom>
          </LayoutIntro>
        </div>
      );
    }
  };

  return (
    <div>
      <CookiesProvider>
        <UserProvider>
          {switchLayout()}
          <ToastContainer />
        </UserProvider>
      </CookiesProvider>
    </div>
  );
}

export default MyApp;
