import '@/styles/globals.css';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';

import MainLayout from '@/components/layout/MainLayout';
import theme from '@/styles/theme';

import type { AppProps } from 'next/app';

const emotionCache = createCache({
  key: 'css',
  stylisPlugins: [],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
