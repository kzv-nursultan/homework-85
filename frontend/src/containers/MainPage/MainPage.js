import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "../../store/actions/ArtistActions";
import ArtistCard from "../../components/ArtistCard/ArtistCard"

const MainPage = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.artists.data);

    useEffect(()=>{
        dispatch(getArtists());
    },[dispatch]);

    const artistsList = (
        data.map(artist=>(
            <ArtistCard
            key = {artist._id}
            image={artist.image}/>
        ))
    );

    return (
        <div>
            {artistsList}
        </div>
    )
}

export default MainPage;