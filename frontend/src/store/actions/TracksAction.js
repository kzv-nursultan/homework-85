import axiosUrl from "../../axiosUrl";

export const GET_TRACK_REQUEST = 'GET_TRACK_REQUEST';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAILURE = 'GET_TRACK_FAILURE';

export const getTrackRequest = () => ({type:GET_TRACK_REQUEST});
export const getTrackSuccess = value =>({type:GET_TRACK_SUCCESS, value});
export const getTrackFailure = error => ({type:GET_TRACK_FAILURE, error});

export const getTrack = (path) => {
    return async dispatch => {
        try {
            dispatch(getTrackRequest());
            const response = await axiosUrl.get(path);
            dispatch(getTrackSuccess(response.data));
        } catch (error) {
            dispatch(getTrackFailure(error));
        };
    };
} ;