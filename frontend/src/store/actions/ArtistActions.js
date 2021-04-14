import axiosUrl from "../../axiosUrl";

export const GET_ARTISTS_REQUEST = 'GET_ARTIST_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const getArtistsRequest = () => ({type:GET_ARTISTS_REQUEST});
export const getArtistsSuccess = value => ({type:GET_ARTISTS_SUCCESS, value});
export const getArtistsFailure = error => ({type:GET_ARTISTS_FAILURE, error});

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