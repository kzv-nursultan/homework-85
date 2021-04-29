import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {deleteArtist, patchArtist} from "../../store/actions/ArtistActions";
import {deleteAlbum, patchAlbum} from "../../store/actions/AlbumsActions";

const useStyles = makeStyles({
    root: {
        maxWidth: 390,
        margin:'10px auto'
    },
    media: {
        height: 300,
        backgroundPosition:'center',
        backgroundSize:'390px 300px',
        backgroundRepeat:'no-repeat'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    },
    deleteBtn: {
        margin: 7,
    },
    publish: {
        color: 'green',
        alignItems: 'center',
    }
});

const ItemCard = ({image, year, name, published, moreBtn, id, artist_id}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const photoUrl = 'http://localhost:8000/' + image;
    const avatar = 'https://clipground.com/images/music-png-logo-3.png'

    const user = useSelector(state=>state?.users.loginUser?.user);

    const publishHandler = () => {
        year ? dispatch(patchAlbum(id, artist_id)) :
          dispatch(patchArtist(id, {published: true}))
    };

    const deleteHandler = () => {
        year ? dispatch(deleteAlbum(id, artist_id)) :
          dispatch(deleteArtist(id))
    };

    return (
        <Card className={classes.root} style={{display: published || user?.role === 'admin' ? 'block' : 'none'}}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image ={image ? photoUrl : avatar}
                    title="artist or band photo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Name: <strong>{name}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ display: year ? "block" : "none"}}>
                        Production year: <strong>{year}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button size="small"
                        color="primary"
                        onClick={moreBtn}>
                    Learn More
                </Button>
                {user?.role === 'admin' && (
                  <Button size="small"
                          color="secondary"
                          variant='contained'
                          onClick={deleteHandler}
                          className={classes.deleteBtn}>
                      Delete
                  </Button>
                )}

                { ['admin'].includes(user?.role) && (
                  published ?  <Typography variant='h6' className={classes.publish}>
                        Published <DoneOutlineIcon/>
                  </Typography> :
                    <Button size="small"
                    color="primary"
                    variant='contained'
                    onClick={publishHandler}>
                    publish
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ItemCard;
