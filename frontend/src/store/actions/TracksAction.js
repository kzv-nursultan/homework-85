import axiosUrl from "../../axiosUrl";
import {NotificationManager} from "react-notifications";

export const GET_TRACK_REQUEST = 'GET_TRACK_REQUEST';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAILURE = 'GET_TRACK_FAILURE';

export const POST_TRACK_REQUEST = 'POST_TRACK_REQUEST';
export const POST_TRACK_SUCCESS = 'POST_TRACK_SUCCESS';
export const POST_TRACK_FAILURE = 'POST_TRACK_FAILURE';

export const PATCH_TRACK_REQUEST = 'PATCH_TRACK_REQUEST';
export const PATCH_TRACK_SUCCESS = 'PATCH_TRACK_SUCCESS';
export const PATCH_TRACK_FAILURE = 'PATCH_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

export const getTrackRequest = () => ({type:GET_TRACK_REQUEST});
export const getTrackSuccess = value =>({type:GET_TRACK_SUCCESS, value});
export const getTrackFailure = error => ({type:GET_TRACK_FAILURE, error});

export const postTrackRequest = () => ({type: POST_TRACK_REQUEST});
export const postTrackSuccess = value => ({type: POST_TRACK_SUCCESS, value});
export const postTrackFailure = error => ({type: POST_TRACK_FAILURE, error});

export const patchTrackRequest = () => ({type: PATCH_TRACK_REQUEST});
export const patchTrackSuccess = value => ({type: PATCH_TRACK_SUCCESS, value});
export const patchTrackFailure = error => ({type: PATCH_TRACK_FAILURE, error});

export const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
export const deleteTrackSuccess = id => ({type: DELETE_TRACK_SUCCESS, id});
export const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, error});


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

export const patchTrack = (id, path) => {
    return async dispatch => {
        try {
            dispatch(patchTrackRequest());
            const response = await axiosUrl.patch('/tracks/'+id, {published: true});
            await dispatch(patchTrackSuccess(response.data));
            await dispatch(getTrack(path))
            NotificationManager.success('Track published!')
        } catch (e) {
            dispatch(patchTrackFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};

export const deleteTrack = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteTrackRequest());
            await axiosUrl.delete('/tracks/'+id);
            await dispatch(deleteTrackSuccess(id));
            NotificationManager.success('Deleted!')
        } catch (e) {
            dispatch(deleteTrackFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};