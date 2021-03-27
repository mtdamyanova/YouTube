import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import styles from './SignUp.module.scss';
import { auth, db } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from '../../utils';
import logo from '../../assets/logo.png';
import { Alert } from '@material-ui/lab';

export default function SignUp() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    const createUserWithEmailAndPasswordHandler = (event, firstName, lastName, email, password, rePassword) => {
        event.preventDefault();
        [firstName, lastName, email, password, rePassword] = [firstName.trim(), lastName.trim(), email.trim(), password.trim(), rePassword.trim()];
        if (!firstName) {
            setAlert('Enter a first name');
        } else if (!lastName) {
            setAlert('Enter a last name');
        } else if (!email) {
            setAlert('Enter an email');
        } else if (!validateEmail(email)) {
            setAlert('Enter a valid email');
        } else if (!password) {
            setAlert('Enter a password');
        } else if (!rePassword) {
            setAlert('Confirm password');
        } else if (password !== rePassword) {
            setAlert('Passwords didn\'t match');
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                let displayName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + ' ' + lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
                const data = {
                    names: displayName,
                    email: email,
                    videos: [],
                    history: [],
                }
                const user = res.user;
                user.updateProfile({
                    displayName: displayName,
                });

                db.collection('users').doc(res.uid).set(data);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setRePassword('');
                history.push('/signin');
            })
            .catch(err => err);
    };
    const onInputChange = (e) => {
        e.preventDefault();
        const { id, value } = e.currentTarget;
        switch (id) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                setRePassword(value);
        }
    };


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
          <div className={styles.alert}>
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} open={open} autoHideDuration={7000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">{alert}</Alert>
                </Snackbar>
            </div>
            <form className={styles.signUp}>
                <img src={logo} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
                <h2 className={styles.welcomeText}>Create your Account</h2>
                <p className={styles.welcomeText}>to continue to YouTube</p>
                <div className={styles.container}>
                    <TextField required className={styles.inputs} size="small" label="First name" variant="outlined" value={firstName} onChange={(e) => onInputChange(e)} id="firstName" autoComplete="new-password" />
                    <TextField required className={styles.inputs} size="small" label="Last name" variant="outlined" value={lastName} id="lastName" onChange={(e) => onInputChange(e)} autoComplete="new-password" />
                </div>
                <div className={styles.emailContainer}>
                    <TextField required type="email" size="small" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <div className={styles.container}>
                    <TextField required type="password" className={styles.inputs} size="small" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} />
                    <TextField required type="password" className={styles.inputs} size="small" label="Confirm" variant="outlined" value={rePassword} id="rePassword" onChange={(e) => onInputChange(e)} />
                </div>
                <p id={styles.info}>Use 6 or more characters</p>
                <div className={styles.buttons}>
                    <Link to="signin" className={styles.link}>Sign in instead</Link>
                    <div className={styles.button}>
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, firstName, lastName, email, password, rePassword);
                                handleClick();
                            }}>
                            sign up
                </Button>
                    </div>
                </div>
                <Link to="reset" className={styles.link} >Password reset</Link>
            </form>
        </>
    );
}
