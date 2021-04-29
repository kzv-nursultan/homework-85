import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import FormInput from "./FormInput";
import FormTitle from "../../components/FormTitle/FormTitle";
import {useDispatch} from "react-redux";
import {postArtists} from "../../store/actions/ArtistActions";
import SubmitBtn from "../../components/UI/SubmitBtn/SubmitBtn";

const AddArtist = () => {
  const dispatch = useDispatch();
  const [artist, setArtist] = useState({
    name: '',
    info: '',
    image: '',
  });

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;

    setArtist(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileChangeHandler = e => {
    if(e.target.files[0].name){
      const name = e.target.name;
      const file = e.target.files[0];

      setArtist(prevState=>({
        ...prevState,
        [name]:file
      }));
    } else {
      setArtist(prevState=>({
        ...prevState,
        image:''
      }));
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(artist).forEach(key=>(
      formData.append(key, artist[key])
    ));

    dispatch(postArtists(formData));
  };

  return (
    <Grid container direction='column' component='form' onSubmit={submitHandler}>

      <FormTitle variant={'h4'} text={'Add Artist'}/>

        <FormInput
        name='name'
        label='Artist Name'
        value={artist.name}
        required
        onChange={inputChangeHandler}/>

      <FormInput
        name='info'
        label='Artist Info'
        value={artist.info}
        required
        onChange={inputChangeHandler}/>

      <FormInput
        name='image'
        type='file'
        onChange={fileChangeHandler}/>

      <SubmitBtn/>

    </Grid>
  )
};

export default AddArtist;