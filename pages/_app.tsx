import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import "../styles/global.scss"
import { notification } from 'antd';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from '../store';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  notification.config({
    // placement: 'bottomRight',
    // bottom: 50,
    duration: 3,
    // rtl: true,
  });

  return <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      {/* @ts-ignore */}
      <PayPalScriptProvider deferLoading={true}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>
}

export default MyApp
