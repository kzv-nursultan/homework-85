import axiosUrl from "../../axiosUrl";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const fetchAlbumsRequest = () => ({type:FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = value => ({type:FETCH_ALBUMS_SUCCESS, value});
export const fetchAlbumsFailure = error => ({type:FETCH_ALBUMS_FAILURE, error});

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