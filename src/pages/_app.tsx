import '@/styles/globals.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';

import MainLayout from '@/components/layout/MainLayout';
import chakraTheme from '@/styles/theme/chakraTheme';
import emotionTheme from '@/styles/theme/emotionTheme';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={chakraTheme}>
      <ThemeProvider theme={emotionTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </ChakraBaseProvider>
  );
}
