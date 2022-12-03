import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/store";
import {v1} from "uuid";

ReactDOM.render(<Provider store={store} key={v1()}> <App /> </Provider>,document.getElementById('root'));

serviceWorker.unregister();
