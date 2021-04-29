import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {logOut} from "../../store/actions/UsersActions";

const useStyle = makeStyles({
    header: {
        color: 'white',
        fontWeight:'bold'
    }
});

const LoggedInUser = ({username}) => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = async () => {
        await dispatch(logOut());
        history.push('/');
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
            <MenuItem onClick={logOutHandler}> Log Out </MenuItem>
            <MenuItem component={Link} to='/track_history'> History </MenuItem>
            <MenuItem component={Link} to='/add_artist'>Add Artist</MenuItem>
            <MenuItem component={Link} to='/add_album'>Add Album</MenuItem>
            <MenuItem component={Link} to='/add_track'>Add Track</MenuItem>
        </Menu>
        </>
    );
};

export default LoggedInUser;