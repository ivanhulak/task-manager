import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './reset.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);