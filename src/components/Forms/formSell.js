import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { formatValor } from "../../utils/formatNumber";

export default function FormSell({ props }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [price, setPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [product, setProduct] = useState({});
  const [userName, setUserName] = useState();
  const [imei, setImei] = useState();

  const [block, setBlock] = useState("disabled");

  const handleAdd = () => {
    props.addSell({ product, user, price, amountPaid });
  };

  const handleImeiChange = e => {
    const selectedImei = e.target.value;

    setProduct(props.imeis.find(item => item.imei == selectedImei));
    setImei(selectedImei);
  };

  const handleUserChange = e => {
    const selectedName = e.target.value;

    setUser(props.users.find(item => item.name == selectedName));
    setUserName(selectedName);
  };

  console.log("amountPaid", amountPaid);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Nova venda
        </Typography>
        <Autocomplete
          id="imeis"
          fullWidth
          options={props.imeis}
          getOptionLabel={option => option.imei}
          renderInput={params => (
            <TextField
              {...params}
              required
              label="IMEIS"
              variant="outlined"
              fullWidth
              name="imei"
            />
          )}
          value={imei}
          onSelect={handleImeiChange}
        />
        <Autocomplete
          id="sellers"
          fullWidth
          options={props.users}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField
              {...params}
              required
              label="Clientes"
              variant="outlined"
              fullWidth
              name="seller"
            />
          )}
          value={userName}
          onSelect={handleUserChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          onChange={e => setPrice(formatValor(e.target.value))}
          name="price"
          label="Preço"
          placeholder="Valor do produto"
          id="price"
          value={formatValor(price)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="text"
          required
          placeholder="Valor recebido pelo produto"
          fullWidth
          onChange={e => setAmountPaid(formatValor(e.target.value))}
          name="amountPaid"
          label="Valor pago"
          id="amountPaid"
          value={amountPaid}
        />
        <Button
          {...block}
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleAdd}
        >
          Adicionar venda
        </Button>
        <form className={classes.form} noValidate></form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
