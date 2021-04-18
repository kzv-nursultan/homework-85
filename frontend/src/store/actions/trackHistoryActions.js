import axiosUrl from "../../axiosUrl";

export const POST_TRACK_HISTORY_REQUEST = 'POST_TRACK_HISTORY_REQUEST';
export const POST_TRACK_HISTORY_SUCCESS = 'POST_TRACK_HISTORY_SUCCESS';
export const POST_TRACK_HISTORY_FAILURE = 'POST_TRACK_HISTORY_FAILURE';

export const GET_TRACK_HISTORY_REQUEST = 'GET_TRACK_HISTORY_REQUEST';
export const GET_TRACK_HISTORY_SUCCESS = 'GET_TRACK_HISTORY_SUCCESS';
export const GET_TRACK_HISTORY_FAILURE = 'GET_TRACK_HISTORY_FAILURE';

export const postTrackHistoryRequest = () => ({type:POST_TRACK_HISTORY_REQUEST});
export const postTrackHistorySuccess = () => ({type:POST_TRACK_HISTORY_SUCCESS});
export const postTrackHistoryFailure = error => ({type:POST_TRACK_HISTORY_FAILURE, error});

export const getTrackHistoryRequest = () => ({type:GET_TRACK_HISTORY_REQUEST});
export const getTrackHistorySuccess = value => ({type:GET_TRACK_HISTORY_SUCCESS, value});
export const getTrackHistoryFailure = error => ({type:GET_TRACK_HISTORY_FAILURE, error});

export const postTrackHistory = (data, token) => {
    return async dispatch => {
        try {
            dispatch(postTrackHistoryRequest());
            await axiosUrl.post('/track_history', data, {headers:{'Authorization':token}});
            dispatch(postTrackHistorySuccess());
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(postTrackHistoryFailure(error.response.data));
            } else {
                dispatch(postTrackHistoryFailure({global:'No internet'}));
            };
        };
    };
};

export const getTrackHistory = (id) => {
    return async dispatch => {
        try {
            dispatch(getTrackHistoryRequest());
            const response = await axiosUrl.get('/track_history/'+id);
            dispatch(getTrackHistorySuccess(response.data));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(getTrackHistoryFailure(error.response.data));
            } else {
                dispatch(getTrackHistoryFailure({global: 'No internet'}));
            };
        };
    };
};