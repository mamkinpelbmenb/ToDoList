import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}


 // index.tsx:7 Uncaught Error: Failed to find the root element
 //     at ./src/index.tsx (index.tsx:7:1)
 //     at options.factory (react refresh:37:1)
 //     at __webpack_require__ (bootstrap:22:1)
 //     at startup:7:1
 //     at startup:7:1