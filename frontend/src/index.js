import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {artistReducer} from "./store/reducers/artistReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    artists: artistReducer
});

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app,document.getElementById('root'));