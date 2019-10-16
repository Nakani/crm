import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getName } from '../services/requisitions'


const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export default function FormProduto() {
  const classes = useStyles();
  const [values, setValues] = useState({ upc: '' });

  const handleSubmit = () => {
    var db = firebase.firestore();

    const resultName = getName(values.upc)
    console.log(resultName)

    // db.collection('produto')
    //   .add({
    //     name: values.name,
    //     upc: values.upc,
    //     date: Date.now()
    //   })
    //   .then(function(docRef) {
    //     alert('Adicionado com sucesso');
    //     console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch(function(error) {
    //     alert('Ocorreu um erro, tente novamente');
    //     console.error('Error adding document: ', error);
    //   });
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
          Novo produto
        </Typography>
        <form className={classes.form} noValidate>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleInputChange}
            name="upc"
            label="UPC"
            id="upc"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
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