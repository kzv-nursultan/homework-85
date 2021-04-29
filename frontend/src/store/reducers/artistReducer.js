import {
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS,
    POST_ARTISTS_FAILURE,
    POST_ARTISTS_REQUEST,
    POST_ARTISTS_SUCCESS
} from "../actions/ArtistActions";

const initialState = {
    loading: false,
    data: [],
    sendStatus: null,
    error:null,
};

export const artistReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ARTISTS_REQUEST:
            return {...state, loading: true};
        case GET_ARTISTS_SUCCESS:
            return {...state, data:action.value, loading: false};
        case GET_ARTISTS_FAILURE:
            return {...state, error:action.error, loading: false};
        case POST_ARTISTS_REQUEST:
            return {...state, loading: true};
        case POST_ARTISTS_SUCCESS:
            return {...state, sendStatus: action.value, loading: false};
        case POST_ARTISTS_FAILURE:
            return {...state, sendStatus: action.error, loading: false};
        default:
            return state;
    }
};