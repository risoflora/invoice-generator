import React from 'react';
import ReactDOM from 'react-dom/client';

import Popup from './views/popup';
import Options from './views/options';

import './index.scss';

const popup = document.getElementById('popup');

ReactDOM.createRoot(popup || document.getElementById('options')!).render(
  <React.StrictMode>{popup ? <Popup /> : <Options />}</React.StrictMode>
);
