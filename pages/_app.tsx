import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'twin.macro';

import GlobalStyles from './../styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
