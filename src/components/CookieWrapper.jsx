'use client';

import { CookiesProvider } from 'react-cookie';

export default function CookieWrapper({ children }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
