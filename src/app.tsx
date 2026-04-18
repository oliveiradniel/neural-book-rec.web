import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './core/query-client';

import { Home } from './pages/home';
import { Toaster } from 'sonner';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Toaster />
    </QueryClientProvider>
  );
}
