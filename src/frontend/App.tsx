import React, { type FC } from 'react';
import { Editor } from './components/Editor';
import { QueryClient, QueryClientProvider } from 'react-query';
import './reset.css';
import './global.css';

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Editor/>
    </QueryClientProvider>
  );
};
