import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../utils/createMockRouter';

const IndexWrapper: React.FC = ({ children }) => {
  const queryClient = new QueryClient();
  const mockRouter = createMockRouter({ basePath: '/' });

  return (
    <RouterContext.Provider value={mockRouter}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RouterContext.Provider>
  );
};

export default IndexWrapper;
