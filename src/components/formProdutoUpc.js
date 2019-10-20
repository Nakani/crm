import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { database } from '../services/database'
import color from '@material-ui/core/colors/grey';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default function FormProdutoUpc(props) {
    const classes = useStyles();
    const [values, setValues] = useState([]);

    const handleAdd = async () => {
        if (values.upc && values.name) {
            const result = await database.addUpc(values)
            if (result.key != null) {
                props.data.history.push('/imeis/' + values.upc);
            }
        } else {
            alert('Por favor preencha o UPC e o nome!')
        }

    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Novo Upc
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
                        label="Nome Upc"
                        id="name"

                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="color"
                        label="Cor"
                        id="color"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="upc"
                        label="UPC"
                        id="upc"
                    />

                    <Select
                        select
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={values.tipo}
                        fullWidth
                        onChange={handleInputChange}
                        name="tipo"
                        label="Tipo"
                        id="typeProduct"
                    >
                        <MenuItem value={0}>Novo</MenuItem>
                        <MenuItem value={1}>Semi-novo</MenuItem>
                        <MenuItem value={2}>Outros</MenuItem>
                    </Select>
                    <Select
                        select
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={values.category}
                        fullWidth
                        onChange={handleInputChange}
                        name="category"
                        label="Categoria"
                        id="category"
                    >
                        <MenuItem value={0}>iphone</MenuItem>
                        <MenuItem value={1}>Watch</MenuItem>
                        <MenuItem value={2}>Ipad</MenuItem>
                        <MenuItem value={3}>Mac</MenuItem>
                        <MenuItem value={4}>Acessórios</MenuItem>
                    </Select>
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