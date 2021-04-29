import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {useDispatch, useSelector} from "react-redux";
import {postTrackHistory} from "../../store/actions/trackHistoryActions";
import {getAlbumById} from "../../store/actions/AlbumsActions";
import SimpleModal from "../UI/SimpleModal/SimpleModal";

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
    },
    videoBtn: {
        margin: 5,
    }
});

const TracksCard = ({name, duration, number, id, album, video}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state=>state.users.loginUser.user);
    const artist = useSelector(state=>state.albums.albumById);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(getAlbumById(album));
        };
        fetchData().catch(error=>console.error(error));
    },[dispatch, album]);

    const listenBtnHandler = async () => {
        dispatch(postTrackHistory({track:id, artist:artist.artist}, user.token));
    };

    const watchVideoBtn = () => {
        setOpen(true);
        dispatch(postTrackHistory({track:id, artist:artist.artist}, user.token));
    };

    const closeModal = () => {
        setOpen(false);
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
            {video && (
                <Button variant='contained'
                        className={classes.videoBtn}
                        color='secondary'
                        onClick={watchVideoBtn}
                        disabled={user ? false : true}>
                    Watch video
                </Button>
            )}
            <SimpleModal video={video} open={open} onClose={closeModal}/>
        </Card>
    );
};

export default TracksCard;
