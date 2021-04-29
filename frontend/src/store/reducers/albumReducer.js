import {
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    GET_ALBUM_BY_ID_FAILURE,
    GET_ALBUM_BY_ID_REQUEST,
    GET_ALBUM_BY_ID_SUCCESS,
    POST_ALBUM_FAILURE,
    POST_ALBUM_REQUEST,
    POST_ALBUM_SUCCESS
} from "../actions/AlbumsActions";

const initialState = {
    loading:false,
    albums:[],
    error:null,
    albumById:{},
    albumByIdError:null,
    postStatus: null
}

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, albums:action.value, loading: false};
        case FETCH_ALBUMS_FAILURE:
            return {...state, error:action.error, loading:false};
        case GET_ALBUM_BY_ID_REQUEST:
            return {...state, loading: true};
        case GET_ALBUM_BY_ID_SUCCESS:
            return {...state, albumById: action.value, loading: false};
        case GET_ALBUM_BY_ID_FAILURE:
            return {...state, albumByIdError: action.error, loading: false};
        case POST_ALBUM_REQUEST:
            return {...state, loading: true};
        case POST_ALBUM_SUCCESS:
            return {...state, postStatus: action.value, loading: false};
        case POST_ALBUM_FAILURE:
            return {...state, postStatus: action.error, loading: false};
        default:
            return state;
    };
};