import {
    GET_TRACK_HISTORY_FAILURE,
    GET_TRACK_HISTORY_REQUEST, GET_TRACK_HISTORY_SUCCESS,
    POST_TRACK_HISTORY_FAILURE,
    POST_TRACK_HISTORY_REQUEST,
    POST_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    loading:false,
    history:[],
    error:null
};

export const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TRACK_HISTORY_REQUEST:
            return {...state, loading: true};
        case POST_TRACK_HISTORY_SUCCESS:
            return {...state, loading: false};
        case POST_TRACK_HISTORY_FAILURE:
            return {...state, error: action.error, loading: false};
        case GET_TRACK_HISTORY_REQUEST:
            return {...state, loading: true};
        case GET_TRACK_HISTORY_SUCCESS:
            return {...state, history: action.value, loading: false};
        case GET_TRACK_HISTORY_FAILURE:
            return {...state, error: action.error, loading: false};
        default:
            return state;
    };
};