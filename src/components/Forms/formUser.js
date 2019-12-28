import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export default function FormProduto(props) {
  const classes = useStyles();
  const [values, setValues] = useState();
  const [fields, setFields] = useState([{ name: "", email: "" }]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [block, setBlock] = useState("disabled");

  const handleAdd = () => {
    console.log({ email, name });
    props.addUser({ email, name });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Novo cliente
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          onChange={e => setName(e.target.value)}
          name="name"
          label="Nome"
          id="name"
          value={fields.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="email"
          required
          fullWidth
          onChange={e => setEmail(e.target.value)}
          name="email"
          label="Email"
          id="email"
          value={fields.email}
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
          Adicionar
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
