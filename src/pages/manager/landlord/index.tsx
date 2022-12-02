import { useRouter } from 'next/router';

const LandlordHome = () => {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    // router.push('/manager/landlord/list-home');
    // router.push('/manager/landlord');
  }

};

export default LandlordHome;
