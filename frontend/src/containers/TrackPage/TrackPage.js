import React, {useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getTrack} from "../../store/actions/TracksAction";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import {makeStyles} from "@material-ui/core/styles";
import TracksCard from "../../components/TracksCard/TracksCard";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    mainBlock:{
        maxWidth:400,
        margin:'10px auto',
        textAlign:'center'
    },
    btnBlock:{
      flexDirection:'column',
    },
    goBackBtn:{
        maxWidth:150,
        margin:'5px auto',
        display:"block"
    }
});

const TrackPage = props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const tracks = useSelector(state=>state.tracks.data);
    const artist = useSelector(state => state.albums);
    const url = 'http://localhost:8000/tracks?album=' + props.match.params.id;

    useEffect(()=>{
        dispatch(getTrack(url))
    },[dispatch, url]);
    
    const toMainPage = () => {
        history.push('/');
    };
    
    const returnBack = () => {
        history.goBack();
    };

    let artistInfo = 'no info';

    if(tracks[0] && artist.albumById.artist) {
         artistInfo = (
            <Grid>
                <Typography variant='h4' gutterBottom>
                    Albums name: <br/> <strong>{tracks[0].album.name}</strong>
                </Typography>
                <Typography variant='h4' gutterBottom>
                    Artist name: <br/> <strong>{artist.albumById.artist.name}</strong>
                </Typography>
            </Grid>
        );
    }

    let trackList = (
        <Grid>
            <Typography variant='h4'>
                No tracks found <SentimentDissatisfiedIcon fontSize='large' color='secondary'/>
            </Typography>
            <Grid className={classes.btnBlock}>
                <Button
                    className={classes.goBackBtn}
                    variant='outlined'
                    color='primary'
                    startIcon={<ArrowBack/>}
                    onClick={returnBack}>
                    Return back to Albums Page?
                </Button>
                <Button
                    className={classes.goBackBtn}
                    variant='outlined'
                    color='secondary'
                    startIcon={<ArrowBack/>}
                    onClick={toMainPage}>
                    Return Back to Main Page?
                </Button>
            </Grid>
        </Grid>
    );

    if(tracks[0]) {
        let i = 0;
       trackList = (
           tracks.map(track=>(
               <TracksCard
                   key={track._id}
                   id={track._id}
                   name={track.name}
                   duration={track.duration}
                   number={i+=1}
                   album={props.match.params.id}
                   video={track.video}/>
           ))
       );
    };

    return (
        <Grid className={classes.mainBlock}>
            <Grid>
                {artistInfo}
            </Grid>
            <Grid>
                {trackList}
            </Grid>
        </Grid>
    );
};

export default TrackPage;