import {
    DELETE_ARTIST_FAILURE,
    DELETE_ARTIST_REQUEST, DELETE_ARTIST_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS, PATCH_ARTIST_FAILURE, PATCH_ARTIST_REQUEST, PATCH_ARTIST_SUCCESS,
    POST_ARTISTS_FAILURE,
    POST_ARTISTS_REQUEST,
    POST_ARTISTS_SUCCESS
} from "../actions/ArtistActions";

const initialState = {
    loading: false,
    data: [],
    sendStatus: null,
    error:null,
    patchStatus:null,
    deleteStatus:null,
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
        case PATCH_ARTIST_REQUEST:
            return {...state, loading: true};
        case PATCH_ARTIST_SUCCESS:
            return {...state, patchStatus: action.value, loading: false};
        case PATCH_ARTIST_FAILURE:
            return {...state, patchStatus: action.error, loading: false};
        case DELETE_ARTIST_REQUEST:
            return {...state, loading: false};
        case DELETE_ARTIST_SUCCESS:
            return {...state, data: state.data.filter(artist => artist._id !== action.id), loading: false};
        case DELETE_ARTIST_FAILURE:
            return {...state, deleteStatus: action.error, loading: false};
        default:
            return state;
    }
};