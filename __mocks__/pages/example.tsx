import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../utils/createMockRouter';

// Setup wrapper for react-query & router example
const ExampleWrapper: React.FC = ({ children }) => {
  const queryClient = new QueryClient();
  const mockRouter = createMockRouter({
    query: { id: '1' }, // example using router.query data
  });

  return (
    <RouterContext.Provider value={mockRouter}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RouterContext.Provider>
  );
};

export default ExampleWrapper;
