import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@material-ui/core";
import {fetchAlbums} from "../../store/actions/AlbumsActions";
import Button from "@material-ui/core/Button";
import ReplyIcon from '@material-ui/icons/Reply';
import {useHistory} from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    nameBlock:{
       textAlign:'center'
    }
});

const AlbumPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const albums = useSelector(state => state.albums.albums);
    const id = props.match.params.id;

    useEffect(()=>{
        dispatch(fetchAlbums(id));
    },[dispatch, id]);

    const backBtn = () => {
        history.push('/');
    };

    const moreBtn = (id) => {
        history.push('/tracks/' + id);
    };

    let artistName = (
        <Grid>
            <Typography variant='h4'>
                Albums of this artist not found in database.
            </Typography>
            <Button
            variant='contained'
            color='primary'
            startIcon={<ReplyIcon/>} onClick={backBtn}>
                Return Back
            </Button>
        </Grid>
    );

   if(albums[0]) {
       artistName = (
           <Grid>
               <Typography variant='h4' className={classes.nameBlock}>
                   Name: <strong>{albums[0].artist.name}</strong>
               </Typography>
           </Grid>

       );
   };

    const albumsList = (
       albums.map(album=>(
           <ItemCard
           key = {album._id}
           name = {album.name}
           year = {album.production_year}
           image = {album.image}
           moreBtn={()=>moreBtn(album._id)}/>
       ))
    );

    return (
        <Grid>

            <Grid>
                {artistName}
            </Grid>
            <Grid>
                {albumsList}
            </Grid>
        </Grid>
    );
}

export default AlbumPage;