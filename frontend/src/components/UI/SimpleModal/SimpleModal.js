import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SimpleModal = ({video, open, onClose}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const url = video + '?autoplay=1'

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <iframe width="420" height="315" title='music video'
                    src='https://www.youtube.com/embed/m4K4citMvc8?autoplay=1'>
            </iframe>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default SimpleModal;
