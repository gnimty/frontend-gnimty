import '@/styles/reset.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, Global, ThemeProvider } from '@emotion/react';

import BaseLayout from '@/components/layouts/BaseLayout';
import chakraTheme from '@/styles/theme/chakraTheme';
import emotionTheme from '@/styles/theme/emotionTheme';

import type { AppProps } from 'next/app';

const emotionCache = createCache({
  key: 'css',
  stylisPlugins: [],
});

const Fonts = () => (
  <Global
    styles={`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css');
      `}
  />
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraBaseProvider theme={chakraTheme} resetCSS={false}>
        <Fonts />
        <ThemeProvider theme={emotionTheme}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </ChakraBaseProvider>
    </CacheProvider>
  );
}
