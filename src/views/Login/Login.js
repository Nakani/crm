import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { database } from '../../services/database'
import { useSelector, useDispatch } from 'react-redux'
import { authUsers } from '../../reduxs/index'
import { useStyles } from './style'

export default function SignIn(props) {
    const classes = useStyles();
    const [values, setValues] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer)

    useEffect(() => {
        saveUser()
    }, [user])


    function saveUser() {
        if (user.user.uid) {
            localStorage.setItem('@authUser', user.user.uid)
            props.history.push('/admin/dashboard');
        }
    }

    function handleAdd() {
        authUsers(dispatch, values)
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Bem Vindo
                </Typography>
                {/* <form className={classes.form} validate> */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleInputChange}
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleInputChange}
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox
                        value={true}
                        onChange={handleInputChange}
                        color="primary" />}
                    label="Lembrar Senha?"
                    name='remember'
                    id='remember'
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleAdd}
                >
                    Entrar
          </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Esqueceu a senha?
              </Link>
                    </Grid>

                </Grid>
                {/* </form> */}
            </div>
        </Container>
    );
}