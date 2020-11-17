import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import redux
import {createStore,compose ,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import appReducers from './reducers/index';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// multi language
import { addLocaleData } from "react-intl";
import viLocaleData from "react-intl/locale-data/vi";
import jaLocaleData from "react-intl/locale-data/ja";
import ConnectedIntlProvider from './i18n/ConnectedIntlProvider';

addLocaleData(viLocaleData);
addLocaleData(jaLocaleData);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appReducers,
    composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
<Provider store={store}>
<ToastContainer/>
    <ConnectedIntlProvider>
        <App />
    </ConnectedIntlProvider>
</Provider>
, 

document.getElementById('root'));
registerServiceWorker();

