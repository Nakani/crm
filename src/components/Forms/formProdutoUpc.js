import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import color from '@material-ui/core/colors/grey';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';


export default function FormProdutoUpc(props) {
    const classes = useStyles();
    const [values, setValues] = useState([]);

    const handleAdd = () => {
        if (values.custo && values.name) {
            props.addUpc(values)
        };
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Novo Produto
        </Typography>
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="name"
                        label="Nome Produto"
                        id="name"

                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="custo"
                        label="Custo"
                        id="custo"
                    />


                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="valor"
                        label="Valor"
                        id="valor"
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleAdd}
                    >
                        Adicionar
          </Button>
                </form>
            </div>
        </Container>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));