import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {getArtists} from "../../store/actions/ArtistActions";
import ItemCard from "../../components/ItemCard/ItemCard";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    mainBlock:{
        textAlign:'center',
        display:'block',
        width:'100%',
        margin:'10px auto',
        backgroundImage:'url(http://www.pngall.com/wp-content/uploads/2016/09/Musical-Notes-Transparent-180x180.png)'
    }
})

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const data = useSelector(state => state.artists.data);

    useEffect(()=>{
        dispatch(getArtists());
    },[dispatch]);

    const learnClick = (id) => {
        history.push('/albums/' + id);
    };

    const artistsList = (
       data.map(artist => (
           <ItemCard
           key = {artist._id}
           id={artist._id}
           image = {artist.image}
           name = {artist.name}
           published = {artist.published}
           moreBtn={()=>learnClick(artist._id)}
           />
       ))
    );

    return (
        <Grid className={classes.mainBlock}>
            {artistsList}
        </Grid>
    );
};

export default MainPage;