import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {artistReducer} from "./store/reducers/artistReducer";
import {albumReducer} from "./store/reducers/albumReducer";
import {trackReducer} from "./store/reducers/trackReducer";
import App from './App';
import './index.css';

const rootReducer = combineReducers({
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer
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