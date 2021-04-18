import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getTrackHistory} from "../../store/actions/trackHistoryActions";

const TrackHistory = () => {
    const dispatch = useDispatch();
    const history = useSelector(state=>state.history.history);
    const user = useSelector(state=> state.users.loginUser.user);

    useEffect(()=>{
        if (user) {
            dispatch(getTrackHistory(user._id));
        };
    },[dispatch, user]);

    let trackHistory = 'No tracks yet.'

    if (user) {
        trackHistory = user.username
        if(history.length>0) {
            trackHistory = (
                
            )
        }
    };

    return (
        <Grid container>
            <Grid item>
                {trackHistory}
            </Grid>
        </Grid>
    );
};

export default TrackHistory;