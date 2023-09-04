import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';

import MainLayout from '@/components/layout/MainLayout';
import theme from '@/styles/theme';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
