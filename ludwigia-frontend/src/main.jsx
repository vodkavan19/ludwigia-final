import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import 'react-toastify/dist/ReactToastify.css';

import Theme from '~/Theme';
import App from '~/App';
import '~/assets/scss/globals.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Theme>
                    <App />
                </Theme>
            </PersistGate>
        </Provider>
    </React.Fragment>
);
