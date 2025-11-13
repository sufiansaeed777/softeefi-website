import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top on route changes, not on initial load
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}