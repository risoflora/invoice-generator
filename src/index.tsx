import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/js/bootstrap';

import Popup from './views/popup';
import Options from './views/options';

import './index.scss';

const popup = document.getElementById('popup');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(popup || document.getElementById('options')!).render(
  <React.StrictMode>{popup ? <Popup /> : <Options />}</React.StrictMode>
);
