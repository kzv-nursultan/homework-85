import {FETCH_ALBUMS_FAILURE, FETCH_ALBUMS_REQUEST, FETCH_ALBUMS_SUCCESS} from "../actions/AlbumsActions";

const initialState = {
    loading:false,
    albums:[],
    error:null
}

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, albums:action.value, loading: false};
        case FETCH_ALBUMS_FAILURE:
            return {...state, error:action.error, loading:false};
        default:
            return state;
    };
};