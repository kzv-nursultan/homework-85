import axiosUrl from "../../axiosUrl";
import {NotificationManager} from "react-notifications";

export const GET_TRACK_REQUEST = 'GET_TRACK_REQUEST';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAILURE = 'GET_TRACK_FAILURE';

export const POST_TRACK_REQUEST = 'POST_TRACK_REQUEST';
export const POST_TRACK_SUCCESS = 'POST_TRACK_SUCCESS';
export const POST_TRACK_FAILURE = 'POST_TRACK_FAILURE';

export const getTrackRequest = () => ({type:GET_TRACK_REQUEST});
export const getTrackSuccess = value =>({type:GET_TRACK_SUCCESS, value});
export const getTrackFailure = error => ({type:GET_TRACK_FAILURE, error});

export const postTrackRequest = () => ({type: POST_TRACK_REQUEST});
export const postTrackSuccess = value => ({type: POST_TRACK_SUCCESS, value});
export const postTrackFailure = error => ({type: POST_TRACK_FAILURE, error});

export const getTrack = (path) => {
    return async dispatch => {
        try {
            dispatch(getTrackRequest());
            const response = await axiosUrl.get(path);
            dispatch(getTrackSuccess(response.data));
        } catch (error) {
            dispatch(getTrackFailure(error));
        }
    }
};

export const postTrack = value => {
    return async dispatch => {
        try {
            dispatch(postTrackRequest());
            const response = await axiosUrl.post('/tracks', value);
            dispatch(postTrackSuccess(response.data));
            NotificationManager.success('Success!')
        } catch (e) {
            dispatch(postTrackFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};