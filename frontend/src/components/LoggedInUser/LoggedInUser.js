import React from 'react';
import {useHistory} from "react-router-dom";
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

    const historyHandler = () => {
        history.push('/track_history');
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
            <MenuItem onClick={historyHandler}> History </MenuItem>
            <MenuItem onClick={logOutHandler}> Log Out </MenuItem>
        </Menu>
        </>
    );
};

export default LoggedInUser;