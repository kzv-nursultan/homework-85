import axiosUrl from "../../axiosUrl";
import {NotificationManager} from "react-notifications";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const GET_ALBUM_BY_ID_REQUEST = 'GET_ALBUM_BY_ID_REQUEST';
export const GET_ALBUM_BY_ID_SUCCESS = 'GET_ALBUM_BY_ID_SUCCESS';
export const GET_ALBUM_BY_ID_FAILURE = 'GET_ALBUM_BY_ID_FAILURE';

export const POST_ALBUM_REQUEST = 'POST_ALBUM_REQUEST';
export const POST_ALBUM_SUCCESS = 'POST_ALBUM_SUCCESS';
export const POST_ALBUM_FAILURE = 'POST_ALBUM_FAILURE';

export const PATCH_ALBUM_REQUEST = 'PATCH_ALBUM_REQUEST';
export const PATCH_ALBUM_SUCCESS = 'PATCH_ALBUM_SUCCESS';
export const PATCH_ALBUM_FAILURE = 'PATCH_ALBUM_FAILURE';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

export const fetchAlbumsRequest = () => ({type:FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = value => ({type:FETCH_ALBUMS_SUCCESS, value});
export const fetchAlbumsFailure = error => ({type:FETCH_ALBUMS_FAILURE, error});

export const getAlbumByIdRequest = () => ({type:GET_ALBUM_BY_ID_REQUEST});
export const getAlbumByIdSuccess = value => ({type:GET_ALBUM_BY_ID_SUCCESS, value});
export const getAlbumByIdFailure = error => ({type:GET_ALBUM_BY_ID_FAILURE, error});

export const postAlbumRequest = () => ({type: POST_ALBUM_REQUEST});
export const postAlbumSuccess = value => ({type: POST_ALBUM_SUCCESS, value});
export const postAlbumFailure = error => ({type: POST_ALBUM_FAILURE, error});

export const patchAlbumRequest = () => ({type: PATCH_ALBUM_REQUEST});
export const patchAlbumSuccess = value => ({type: PATCH_ALBUM_SUCCESS, value});
export const patchAlbumFailure = error => ({type: PATCH_ALBUM_FAILURE, error});

export const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
export const deleteAlbumSuccess = value => ({type: DELETE_ALBUM_SUCCESS, value});
export const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, error});

export const fetchAlbums = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            const response = await axiosUrl.get('/albums?artist=' + id);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumsFailure(error));
        }
    };
};

export const getAlbumById = (id) => {
    return async dispatch => {
        try {
            dispatch(getAlbumByIdRequest());
            const response = await axiosUrl.get('/albums/'+id);
            dispatch(getAlbumByIdSuccess(response.data));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(getAlbumByIdFailure(error.response.data));
                NotificationManager.error(error.message);

            } else {
                dispatch(getAlbumByIdFailure({global:'No internet'}));
                NotificationManager.error('No internet');
            }
        }
    };
};

export const postAlbum = (value) => {
    return async dispatch => {
        try {
            dispatch(postAlbumRequest());
            const response = await axiosUrl.post('/albums', value);
            dispatch(postAlbumSuccess(response.data));
            NotificationManager.success('Album successfully created!');
        } catch (e) {
            dispatch(postAlbumFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};

export const patchAlbum = (id, artist_id) => {
    return async dispatch => {
        try {
            dispatch(patchAlbumRequest());
            const response = await axiosUrl.patch('/albums/' + id, {published: true});
            await dispatch(patchAlbumSuccess(response.data));
            await dispatch(fetchAlbums(artist_id));
            NotificationManager.success('Published successfully');
        } catch (e) {
            dispatch(patchAlbumFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};

export const deleteAlbum = (id,artist_id) => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());
            await axiosUrl.delete('/albums/' + id);
            await dispatch(deleteAlbumSuccess());
            await dispatch(fetchAlbums(artist_id))
            NotificationManager.success('Deleted successfully');
        } catch (e) {
            dispatch(deleteAlbumFailure(e));
            NotificationManager.error(e?.message);
        }
    }
};