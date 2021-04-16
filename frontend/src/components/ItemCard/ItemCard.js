import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 390,
        margin:'10px auto'
    },
    media: {
        height: 200,
        backgroundPosition:'top center',

    },
});

const ItemCard = ({image, year, name, moreBtn}) => {
    const classes = useStyles();
    const photoUrl = 'http://localhost:8000/uploads/' + image;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image = {photoUrl}
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
            <CardActions>
                <Button size="small" color="primary" onClick={moreBtn}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default ItemCard;
