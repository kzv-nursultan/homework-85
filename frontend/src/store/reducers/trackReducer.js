import {
    GET_TRACK_FAILURE,
    GET_TRACK_REQUEST,
    GET_TRACK_SUCCESS, POST_TRACK_FAILURE,
    POST_TRACK_REQUEST,
    POST_TRACK_SUCCESS
} from "../actions/TracksAction";

const initialState = {
    loading:true,
    data:[],
    error:null,
    postStatus: null,
};

export const trackReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_TRACK_REQUEST:
            return {...state, loading: true};
        case GET_TRACK_SUCCESS:
            return {...state, data:action.value, loading: false};
        case GET_TRACK_FAILURE:
            return {...state, error:action.error, loading: false};
        case POST_TRACK_REQUEST:
            return {...state, loading: true};
        case POST_TRACK_SUCCESS:
            return {...state, postStatus: action.value, loading: false};
        case POST_TRACK_FAILURE:
            return {...state, postStatus: action.error, loading: false};
        default:
            return state;
    };
};