import axiosUrl from "../../axiosUrl";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const GET_ALBUM_BY_ID_REQUEST = 'GET_ALBUM_BY_ID_REQUEST';
export const GET_ALBUM_BY_ID_SUCCESS = 'GET_ALBUM_BY_ID_SUCCESS';
export const GET_ALBUM_BY_ID_FAILURE = 'GET_ALBUM_BY_ID_FAILURE';

export const fetchAlbumsRequest = () => ({type:FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = value => ({type:FETCH_ALBUMS_SUCCESS, value});
export const fetchAlbumsFailure = error => ({type:FETCH_ALBUMS_FAILURE, error});

export const getAlbumByIdRequest = () => ({type:GET_ALBUM_BY_ID_REQUEST});
export const getAlbumByIdSuccess = value => ({type:GET_ALBUM_BY_ID_SUCCESS, value});
export const getAlbumByIdFailure = error => ({type:GET_ALBUM_BY_ID_FAILURE, error});

export const fetchAlbums = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            const response = await axiosUrl.get('/albums?artist=' + id);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumsFailure(error));
        };
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
            } else {
                dispatch(getAlbumByIdFailure({global:'No internet'}));
            };
        };
    };
};