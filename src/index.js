import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { store } from './redux/configStore';

import { DOMAIN } from './util/setting';
import * as signalR from '@aspnet/signalr';

import './i18n';

export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();


const root = ReactDOM.createRoot(document.getElementById('root'));
connection.start().then(() => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}).catch((error) => {
  console.log(error);
})




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
