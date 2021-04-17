import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import FormInput from "./FormInput";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useSelector} from "react-redux";

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
    }
})

const UserSingIn = () => {
    const classes = useStyles();
    const error = useSelector(state=>state.users.error);
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

        console.log(user);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
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
                       {error.message || error.global}
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
           </form>
        </Grid>
    );
};

export default UserSingIn;