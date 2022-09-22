import { useRouter } from 'next/router';

function RedirectPage() {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/introduce');
  }
}

export default RedirectPage;
