import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import FormInput from "./FormInput";
import {getArtists} from "../../store/actions/ArtistActions";
import {fetchAlbums} from "../../store/actions/AlbumsActions";
import FormTitle from "../../components/FormTitle/FormTitle";
import SubmitBtn from "../../components/UI/SubmitBtn/SubmitBtn";
import {postTrack} from "../../store/actions/TracksAction";

const AddTrack = () => {
  const dispatch = useDispatch();
  const artists = useSelector(state=> state?.artists.data);
  const albums = useSelector(state=>state?.albums.albums);
  const [artist, setArtist] = useState({artist:''});
  const [track, setTrack] = useState({
    name: '',
    album:'',
    duration:'',
    video:''
  });

  useEffect(()=>{
    dispatch(getArtists());
  },[dispatch]);

  useEffect(()=>{
    dispatch(fetchAlbums(artist.artist));
  },[dispatch, artist.artist]);

  const artistChangeHandler = (e) => {
    setArtist({artist: e.target.value});
  };

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setTrack(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(postTrack({...track}));
  } ;

  return (
    <Grid
      container
      component='form'
      justify='center'
      direction='column'
      onSubmit={onSubmitHandler}>

      <FormTitle variant={'h4'} text={'Add track'}/>

      <FormInput
        onChange={onChangeHandler}
        label='Track name'
        name='name'
        required
        value={track.name}
      />

      <FormInput
        onChange={artistChangeHandler}
        label='Artist'
        name='artist'
        select={true}
        options={artists}
        required
        value={artist.artist}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Album'
        name='album'
        select={true}
        options={albums}
        required
        value={track.album}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Duration'
        name='duration'
        placeholder='example 2:20'
        required
        value={track.duration}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Video Link'
        name='video'
        placeholder='Insert embed links from youtube'
        value={track.video}
      />

      <SubmitBtn/>
    </Grid>
  );
};

export default AddTrack;