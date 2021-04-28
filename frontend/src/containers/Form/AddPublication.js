import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, Typography} from "@material-ui/core";
import FormInput from "./FormInput";
import {getArtists} from "../../store/actions/ArtistActions";
import {fetchAlbums} from "../../store/actions/AlbumsActions";
import {getTrack} from "../../store/actions/TracksAction";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  btnSubmit: {
    margin: '10px auto',
    maxWidth: 200
  },
  title: {
    margin: '10px auto'
  }
});

const AddPublication = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const artists = useSelector(state=>state?.artists.data);
  const albums = useSelector(state => state?.albums.albums);
  const tracks = useSelector(state => state?.tracks.data);
  const [publication, setPublication] = useState({
    artist: '',
    album: '',
    track: ''
  });

  useEffect(()=>{
    dispatch(getArtists())
  },[dispatch]);

  useEffect(()=>{
    dispatch(fetchAlbums(publication.artist));
  },[dispatch, publication.artist]);

  useEffect(()=>{
    dispatch(getTrack('tracks?album='+publication.album));
  },[dispatch, publication.album]);

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setPublication(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(publication);
  };

  return (
    <Grid container
          justify='center'
          direction='column'
          component='form'
          onSubmit={onSubmitHandler}>

      <Typography variant='h3' className={classes.title}>
        Add Publication
      </Typography>
      <FormInput
        onChange={onChangeHandler}
        label='Artist'
        name='artist'
        select={true}
        options={artists}
        required
        value={publication.artist}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Album'
        name='album'
        select={true}
        options={albums}
        required
        value={publication.album}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Track'
        name='track'
        select={true}
        options={tracks}
        required
        value={publication.track}
      />

      <Button type='submit' color='primary' variant='contained' className={classes.btnSubmit}>
        submit
      </Button>

    </Grid>
  );
};

export default AddPublication;