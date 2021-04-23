import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {artistReducer} from "./store/reducers/artistReducer";
import {albumReducer} from "./store/reducers/albumReducer";
import {trackReducer} from "./store/reducers/trackReducer";
import {usersReducer} from "./store/reducers/userReducer";
import {trackHistoryReducer} from "./store/reducers/trackHistoryReducer";
import App from './App';
import './index.css';

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('musicUser', serializedState);
    } catch {
        console.log('Could not save to local storage');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('musicUser');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch {
        return undefined;
    }
}


const rootReducer = combineReducers({
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer,
    users: usersReducer,
    history: trackHistoryReducer,
});

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(()=>{
    saveToLocalStorage({
        users: store.getState().users
    });
});

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app,document.getElementById('root'));