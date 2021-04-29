import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "../../store/actions/ArtistActions";
import FormInput from "./FormInput";
import FormTitle from '../../components/FormTitle/FormTitle';
import SubmitBtn from "../../components/UI/SubmitBtn/SubmitBtn";
import {postAlbum} from "../../store/actions/AlbumsActions";

const AddAlbum = () => {
  const dispatch = useDispatch();
  const [album, setAlbum] = useState({
    name: '',
    artist: '',
    production_year: '',
    image: '',
  });
  const artists = useSelector(state=>state?.artists.data);

  useEffect(()=>{
     dispatch(getArtists());
  },[dispatch]);

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setAlbum(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileChangeHandler = e => {
    if(e.target.files[0].name){
      const name = e.target.name;
      const file = e.target.files[0];

      setAlbum(prevState=>({
        ...prevState,
        [name]:file
      }));
    } else {
      setAlbum(prevState=>({
        ...prevState,
        image:''
      }));
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    console.log(album);
    const formData = new FormData();
    Object.keys(album).map(key=>(
      formData.append(key, album[key])
    ));

    dispatch(postAlbum(formData));
  };

  return (
    <Grid
      container
      component='form'
      justify='center'
      direction='column'
      onSubmit={onSubmitHandler}>

      <FormTitle variant={'h4'} text={'Add Album'}/>

      <FormInput
        onChange={onChangeHandler}
        label='Album Name'
        name='name'
        required
        value={album.name}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Artist'
        name='artist'
        select={true}
        options={artists}
        required
        value={album.artist}
      />

      <FormInput
        onChange={onChangeHandler}
        label='Production Year'
        name='production_year'
        required
        value={album.production_year}
      />

      <FormInput
        onChange={fileChangeHandler}
        name='image'
        type='file'
      />

      <SubmitBtn/>

    </Grid>
  );
};

export default AddAlbum;