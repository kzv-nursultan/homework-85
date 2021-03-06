import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {Alert, AlertTitle} from "@material-ui/lab";
import {postUser} from "../../store/actions/UsersActions";
import FormInput from "./FormInput";
import LoginFacebook from "../../components/UI/LoginFacebook/LoginFacebook";

const useStyles = makeStyles({
    formBlock: {
        display: 'block',
        margin: '10px auto',
        textAlign: 'center'
    },
    mainBlock: {
        flexDirection:'column',
        textAlign:"center",
    },
    title: {
        textTransform:'uppercase',
        marginTop:10,
    },
    link:{
        float:'right',
        marginTop:'35px',
        fontSize:'small'
    },
    submitBtn:{
        margin: '5px 0 10px'
    }
})

const UserSingUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username:'',
        password:'',
        displayName:'',
        avatarImage:'',
    });
    const error = useSelector(state => state.users.error);
    const newUser = useSelector(state=>state.users.data)

    const onChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        };
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        await dispatch(postUser('/users', {...user}));
    };


    return (
        <Grid container item xs={12} className={classes.mainBlock}>
            <Typography variant='h4' className={classes.title}>
                <PersonAddIcon fontSize='large' color='action'/>
                <br/>
                <strong>sign up</strong>
            </Typography>
            <form onSubmit={onSubmitHandler} className={classes.formBlock}>
                {newUser._id && (
                    <Grid item className={classes.errorAlert}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            You have successfully registered!
                        </Alert>
                    </Grid>
                )}
                <FormInput
                    name='username'
                    label='Username'
                    onChange={onChangeHandler}
                    required={true}
                    value={user.username}
                    error={Boolean(getFieldError('username'))}
                    helperText={getFieldError('username')}/>

                <FormInput
                    name='password'
                    label='Password'
                    onChange={onChangeHandler}
                    required={true}
                    value={user.password}
                    type='password'
                    error={Boolean(getFieldError('password'))}
                    helperText={getFieldError('password')}/>

                <FormInput
                  name={'displayName'}
                  label={'Display Name'}
                  onChange={onChangeHandler}
                  required={true}
                  value={user.displayName}/>

                <FormInput
                  name={'avatarImage'}
                  label={'Avatar Image'}
                  onChange={onChangeHandler}
                  value={user.avatarImage}/>

                <Grid container item direction='column'>
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                        className={classes.submitBtn}>
                        Submit
                    </Button>

                    <LoginFacebook/>

                </Grid>
               <Grid item>
                   <NavLink to='/login' className={classes.link}>
                       Already registered?
                   </NavLink>
               </Grid>
            </form>
        </Grid>
    );
};

export default UserSingUp;