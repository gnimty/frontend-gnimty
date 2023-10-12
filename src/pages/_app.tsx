import '@/styles/globals.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';

import MainLayout from '@/components/layout/MainLayout';
import chakraTheme from '@/styles/theme/chakraTheme';
import emotionTheme from '@/styles/theme/emotionTheme';

import type { AppProps } from 'next/app';

const emotionCache = createCache({
  key: 'css',
  stylisPlugins: [],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraBaseProvider theme={chakraTheme} resetCSS={false} disableGlobalStyle>
        <ThemeProvider theme={emotionTheme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </ChakraBaseProvider>
    </CacheProvider>
  );
}
