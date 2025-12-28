import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import moment from 'moment';
// @ts-expect-error - moment locale
import 'moment/dist/locale/uk';
import { Toaster } from 'sonner';

import './index.css';
import { queryClient } from './shared/api/queryClient';
import { router } from './router';
import { registerSW } from 'virtual:pwa-register';

moment.locale('uk');

// Register PWA Service Worker
registerSW({
  onNeedRefresh() {
    if (confirm('Доступна нова версія. Оновити?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position='top-center' duration={2000} />
    </QueryClientProvider>
  </StrictMode>
);
