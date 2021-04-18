import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import FormInput from "./FormInput";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {loginUser} from "../../store/actions/UsersActions";

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
    errorAlert: {
        maxWidth: 400
    },
    link:{
        float:'right',
        marginTop:'35px',
        fontSize:'small'
    }
})

const UserSingIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const error = useSelector(state=>state.users.loginError);
    const [user, setUser] = useState({
        username:'',
        password:''
    });

    const onChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(loginUser('/users/session', {...user}));
        setTimeout(()=>{
            history.push('/');
        },2000);
    };

    return (
        <Grid container item xs={12} className={classes.mainBlock}>
            <Typography variant='h4' className={classes.title}>
                <PersonAddIcon fontSize='large' color='action'/>
                <br/>
                <strong>sign in</strong>
            </Typography>
           <form onSubmit={onSubmitHandler} className={classes.formBlock}>
               {error && (
               <Grid item className={classes.errorAlert}>
                   <Alert severity="error">
                       <AlertTitle>Error</AlertTitle>
                       {error.error || error.global}
                   </Alert>
               </Grid>
           )}
               <FormInput
                   name={'username'}
                   label={'Username'}
                   onChange={onChangeHandler}
                   required={true}
                   value={user.username}/>
               <FormInput
                   name={'password'}
                   label={'Password'}
                   onChange={onChangeHandler}
                   required={true}
                   value={user.password}
                   type={'password'}/>
               <Button
                   type='submit'
                   color='primary'
                   variant='contained'>
                   Submit
               </Button>
               <Grid item>
                   <NavLink to='/register' className={classes.link}>
                       Are you new?
                   </NavLink>
               </Grid>
           </form>
        </Grid>
    );
};

export default UserSingIn;