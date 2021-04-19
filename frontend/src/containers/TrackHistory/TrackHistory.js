import React, {useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getTrackHistory} from "../../store/actions/trackHistoryActions";
import HistoryList from "../../components/HistoryList/HistoryList";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    tracksList:{
        textAlign:'center',
        flexDirection:'column'
    }
})

const TrackHistory = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const newHistory = useSelector(state=>state.history.history);
    const user = useSelector(state=> state.users.loginUser.user);

    let trackHistory = user ? 'No tracks yet.' : 'Unauthorized User! Please Sign In!'

    useEffect(  ()=>{
        const fetchData = async () => {
            if (user) {
                await dispatch(getTrackHistory(user.token));
            } else {
                setTimeout(()=>{
                    history.push('/login');
                },2000);
            }
        };
        fetchData().catch(error=>console.error(error));
    },[dispatch, user, history]);

    if (user) {
        if(newHistory.length>0) {
            trackHistory = (
               newHistory.map(object=>(
                   <HistoryList
                   key = {object._id}
                   trackName={object.track.name}
                   artistName={object.artist ? object.artist.name : 'no name in db'}
                   dateTime={object.datetime}/>
               ))
            )
        };
    };

    return (
        <Grid container>
            <Grid item container className={classes.tracksList}>
                <Typography variant='h4'>
                    Your History:
                </Typography>
                {trackHistory}
            </Grid>
        </Grid>
    );
};

export default TrackHistory;