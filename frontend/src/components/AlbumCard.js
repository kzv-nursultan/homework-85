import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const AlbumCard = ({image, name, year}) => {
    const classes = useStyles();
    const albumUrl = 'http://localhost:8000/uploads/' + image;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={albumUrl}
                    title="albums image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Album name: <strong>{name}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Production year: <strong>{year}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default AlbumCard;