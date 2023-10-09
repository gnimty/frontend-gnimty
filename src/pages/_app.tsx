import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';

import MainLayout from '@/components/layout/MainLayout';
import chakraTheme from '@/styles/chakra/chakraTheme';
import theme from '@/styles/theme';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </ChakraProvider>
  );
}
