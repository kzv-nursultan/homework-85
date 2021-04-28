import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {artistReducer} from "./reducers/artistReducer";
import {albumReducer} from "./reducers/albumReducer";
import {trackReducer} from "./reducers/trackReducer";
import {usersReducer} from "./reducers/userReducer";
import {trackHistoryReducer} from "./reducers/trackHistoryReducer";
import thunk from "redux-thunk";
import axiosUrl from "../axiosUrl";

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

axiosUrl.interceptors.request.use(config=>{
    try {
        config.headers['Authorization'] = store.getState().users.loginUser?.user.token;
    } catch (e) {
        //no token exist
    }
    return config;
});

export default store;