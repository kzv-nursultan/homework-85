import React from 'react';
import Button from "@material-ui/core/Button";
import {Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyle = makeStyles({
    header: {
        color: 'white',
        fontWeight:'bold'
    }
});

const LoggedInUser = ({username}) => {
    const classes = useStyle();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const historyHandler = () => {
        history.push('/track_history');
    };

    return (
        <>
        <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.header}
        >
            Hello, {username}
        </Button>
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={historyHandler}> History</MenuItem>
        </Menu>
        </>
    );
};

export default LoggedInUser;