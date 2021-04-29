import axiosUrl from "../../axiosUrl";
import {NotificationManager} from "react-notifications";

export const GET_ARTISTS_REQUEST = 'GET_ARTIST_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const POST_ARTISTS_REQUEST = 'POST_ARTISTS_REQUEST';
export const POST_ARTISTS_SUCCESS = 'POST_ARTISTS_SUCCESS';
export const POST_ARTISTS_FAILURE = 'POST_ARTISTS_FAILURE';

export const PATCH_ARTIST_REQUEST = 'PATCH_ARTIST_REQUEST';
export const PATCH_ARTIST_SUCCESS = 'PATCH_ARTIST_SUCCESS';
export const PATCH_ARTIST_FAILURE = 'PATCH_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

export const getArtistsRequest = () => ({type:GET_ARTISTS_REQUEST});
export const getArtistsSuccess = value => ({type:GET_ARTISTS_SUCCESS, value});
export const getArtistsFailure = error => ({type:GET_ARTISTS_FAILURE, error});

export const postArtistsRequest = () => ({type: POST_ARTISTS_REQUEST});
export const postArtistsSuccess = value => ({type: POST_ARTISTS_SUCCESS, value});
export const postArtistsFailure = error => ({type: POST_ARTISTS_FAILURE, error});

export const patchArtistRequest = () => ({type: PATCH_ARTIST_REQUEST});
export const patchArtistSuccess = value => ({type: PATCH_ARTIST_SUCCESS, value});
export const patchArtistFailure = error => ({type: PATCH_ARTIST_FAILURE, error});

export const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
export const deleteArtistSuccess = id => ({type: DELETE_ARTIST_SUCCESS, id});
export const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            dispatch(getArtistsRequest());
            const response = await axiosUrl.get('/artists');
            dispatch(getArtistsSuccess(response.data));
        } catch (error) {
            dispatch(getArtistsFailure(error));
        };
    };
};

export const postArtists = (data) => {
    return async dispatch => {
        try {
            dispatch(postArtistsRequest());
            const response = await axiosUrl.post('/artists', data);
            dispatch(postArtistsSuccess(response.data));
            NotificationManager.success('Artist successfully created!');
        } catch (e) {
            dispatch(postArtistsFailure(e));
            NotificationManager.error(e.message);
        }
    }
};

export const patchArtist = (id, data) => {
    return async dispatch => {
        try {
            dispatch(patchArtistRequest());
            const response = await axiosUrl.patch('/artists/' + id, {published: true});
            dispatch(patchArtistSuccess(response.data));
            dispatch(getArtists());
            NotificationManager.success('Successfully published!')
        } catch (e) {
            dispatch(patchArtistFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};

export const deleteArtist = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteArtistRequest());
            await axiosUrl.delete('/artists/' + id);
            dispatch(deleteArtistSuccess(id));
            NotificationManager.success('Deleted!')
        } catch (e) {
            dispatch(deleteArtistFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};