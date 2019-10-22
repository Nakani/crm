import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { database } from '../services/database'


export default function FormProduto(props) {
  const classes = useStyles();
  const [values, setValues] = useState();
  const [fields, setFields] = useState([{ imei: '', }]);
  const [imeis, setImei] = useState([])

  const handleAdd = () => {
   let result = database.addImei(values)
   console.log(result)
  };   

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ imei: value, upcId: props.data.data });
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
            type="number"
            required
            fullWidth
            onChange={handleInputChange}
            name="imei"
            label="imei"
            id="imei"
            value={fields.imei}
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