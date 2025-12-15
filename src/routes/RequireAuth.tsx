import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/utils/auth';
import { useAuthStore } from '@/stores/authStore';

export default function RequireAuth() {
  const storeToken = useAuthStore?.((s) => s.token) ?? null;
  const location = useLocation();

  const accessToken = storeToken ?? getAccessToken();

  if (!accessToken) {
    const here = `${location.pathname}${location.search}${location.hash}`;
    if (!here.startsWith('/login')) {
      sessionStorage.setItem('postLoginRedirect', here);
    }
    return (
      <Navigate
        to={`login?redirect=${encodeURIComponent(here)}`}
        replace
        state={{ from: location }}
      />
    );
  }
  return <Outlet />;
}
