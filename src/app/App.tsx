import { useState, useEffect } from 'react';
import { SignUpPage, SignInPage } from '@/modules/auth';
import { HomePage } from '@/modules/dashboard';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#signin') {
    return <SignInPage />;
  }

  if (route === '#home' || route === '#untitled-path') {
    return <HomePage currentRoute={route} />;
  }

  return <SignUpPage />;
}
