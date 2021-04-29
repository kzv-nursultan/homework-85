import {
    DELETE_TRACK_FAILURE,
    DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS,
    GET_TRACK_FAILURE,
    GET_TRACK_REQUEST,
    GET_TRACK_SUCCESS, PATCH_TRACK_FAILURE, PATCH_TRACK_REQUEST, PATCH_TRACK_SUCCESS, POST_TRACK_FAILURE,
    POST_TRACK_REQUEST,
    POST_TRACK_SUCCESS
} from "../actions/TracksAction";

const initialState = {
    loading:true,
    data:[],
    error:null,
    postStatus: null,
    patchStatus: null,
    deleteStatus: null,
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
        case PATCH_TRACK_REQUEST:
            return {...state, loading: true};
        case PATCH_TRACK_SUCCESS:
            return {...state, patchStatus: action.value, loading: false};
        case PATCH_TRACK_FAILURE:
            return {...state, patchStatus: action.error, loading: false};
        case DELETE_TRACK_REQUEST:
            return {...state , loading: true};
        case DELETE_TRACK_SUCCESS:
            return {...state, data: state.data.filter(track=> track._id !== action.id), loading: false};
        case DELETE_TRACK_FAILURE:
            return {...state, deleteStatus: action.error, loading: false};
        default:
            return state;
    };
};