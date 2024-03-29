import '@/styles/reset.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import ChatBubble from '@/components/chat/ChatBubble';
import BaseLayout from '@/components/layouts/BaseLayout';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { ChatContextProvider } from '@/contexts/ChatContext';
import StoreProviders from '@/providers/StoreProviders';
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 쿼리마다 개별적으로 설정
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProviders>
        <CacheProvider value={emotionCache}>
          <ChakraBaseProvider theme={chakraTheme} resetCSS={false}>
            <Fonts />
            <ThemeProvider theme={emotionTheme}>
              <AuthContextProvider>
                <ChatContextProvider>
                  <BaseLayout>
                    <Component {...pageProps} />
                  </BaseLayout>
                  <ChatBubble />
                </ChatContextProvider>
              </AuthContextProvider>
            </ThemeProvider>
          </ChakraBaseProvider>
        </CacheProvider>
      </StoreProviders>
    </QueryClientProvider>
  );
}
