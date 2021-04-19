import React from 'react';
import {Card, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin:'10px auto'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

const HistoryList = ({trackName, artistName, dateTime}) => {
    const classes = useStyles();

    return (
        <Card variant='outlined' className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Name of track
                </Typography>
                <Typography variant="h5" component="h2">
                    {trackName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Artist: {artistName}
                </Typography>
                <Typography variant="body2" component="p">
                    Date: {dateTime}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HistoryList;