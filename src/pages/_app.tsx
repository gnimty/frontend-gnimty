import '@/styles/reset.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider, Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Monitoring } from 'react-scan/monitoring/next';

import ChatBubble from '@/components/chat/ChatBubble';
import BaseLayout from '@/components/layouts/BaseLayout';
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
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.min.css');
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

  const router = useRouter();

  useEffect(() => {
    const { alert: alertMessage, ...alertMessageDeletedQuery } = router.query;
    if (typeof alertMessage === 'string') {
      alert(alertMessage);
      router.replace({ pathname: router.pathname, query: alertMessageDeletedQuery });
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProviders>
        <CacheProvider value={emotionCache}>
          <ChakraBaseProvider theme={chakraTheme} resetCSS={false}>
            <ThemeProvider theme={emotionTheme}>
              <Fonts />
              <ChatContextProvider>
                <BaseLayout>
                  <Component {...pageProps} />
                  <Monitoring
                    apiKey="abZe4dAIl-VFZa2etVXGqSq6K4cYwmDB"
                    url="https://monitoring.react-scan.com/api/v1/ingest"
                  />
                </BaseLayout>
                <ChatBubble />
              </ChatContextProvider>
            </ThemeProvider>
          </ChakraBaseProvider>
        </CacheProvider>
      </StoreProviders>
    </QueryClientProvider>
  );
}
