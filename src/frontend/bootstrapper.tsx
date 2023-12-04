import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

export const bootstrapper = () => {
  const container = document.getElementById('react-root');
  if (!container) return;
  const root = createRoot(container);
  root.render(<App/>);
};
