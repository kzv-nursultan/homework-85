import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button, Grid} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {postTrackHistory} from "../../store/actions/trackHistoryActions";
import {getAlbumById} from "../../store/actions/AlbumsActions";
import SimpleModal from "../UI/SimpleModal/SimpleModal";
import {patchTrack} from "../../store/actions/TracksAction";
import {deleteTrack} from "../../store/actions/TracksAction";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

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
    btnBlock: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 200,
        margin: '0 auto',
    },
    listenBtn: {
        margin: 5,
    },
    videoBtn: {
        margin: 5,
    },
    publish: {
        color: 'green',
        alignItems: 'center',
    }
});

const TracksCard = ({name, duration, number, id, album, video, published, path}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state=>state.users.loginUser.user);
    const artist = useSelector(state=>state.albums.albumById);
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);

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

    const publishBtn = async () => {
        await dispatch(patchTrack(id, path));
        setTrigger(!trigger);
    };

    const deleteBtn = () => {
        dispatch(deleteTrack(id));
    };

    return (
        <Card className={classes.root} variant="outlined" style={{display: published || user?.role === 'admin' ? 'block' : 'none'}}>
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

           <Grid item className={classes.btnBlock}>
               { ['admin'].includes(user?.role) && (
                 published ? <Typography variant='h6' className={classes.publish}>
                       Published <DoneOutlineIcon/>
                   </Typography> :
                   <Button variant='contained'
                           color='secondary'
                           onClick={publishBtn}>
                       Publish
                   </Button>
               )}

               <Button variant="contained" color="primary"
                       className={classes.listenBtn} endIcon={<PlayArrowIcon/>}
                       onClick={listenBtnHandler}
                       disabled={user ? false : true}>
                   Listen
               </Button>

               {video && (
                 <Button variant='contained'
                         className={classes.videoBtn}
                         color='inherit'
                         onClick={watchVideoBtn}
                         disabled={user ? false : true}>
                     Watch video
                 </Button>
               )}

               {['admin'].includes(user?.role) && (
                 <Button variant='contained'
                         color='secondary'
                         onClick={deleteBtn}
                         endIcon={<HighlightOffIcon/>}>
                     <strong>Delete</strong>
                 </Button>
               )}
           </Grid>

            <SimpleModal video={video} open={open} onClose={closeModal}/>
        </Card>
    );
};

export default TracksCard;
