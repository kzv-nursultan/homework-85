import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {useDispatch, useSelector} from "react-redux";
import {postTrackHistory} from "../../store/actions/trackHistoryActions";

const useStyles = makeStyles({
    root: {
        maxWidth: 390,
        margin:'10px auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    listenBtn: {
        margin: '5px auto'
    }
});

const TracksCard = ({name, duration, number, id}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state=>state.users.loginUser.user);

    const listenBtnHandler = async () => {
        dispatch(postTrackHistory({track:id}, user.token));
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Track Name:
                </Typography>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    Duration: {duration}
                </Typography>
                <Typography variant="body2" component="p">
                    Number:{number}
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary"
                    className={classes.listenBtn} endIcon={<PlayArrowIcon/>}
                    onClick={listenBtnHandler}
                    disabled={user ? false : true}>
                Listen
            </Button>
        </Card>
    );
};

export default TracksCard;
