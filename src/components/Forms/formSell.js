import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CssBaseline, TextField, Typography, Container, FormControl, FormControlLabel, RadioGroup, FormLabel, Radio } from "@material-ui/core";
import { formatValor } from "../../utils/formatNumber";
import paymentTypes from '../../utils/paymentTypes'

export default function FormSell({ props }) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [price, setPrice] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
    const [product, setProduct] = useState({});
    const [userName, setUserName] = useState();
    const [paymentType, setPaymentType] = useState(paymentTypes.CASH.name);
    const [imei, setImei] = useState();

    const [block, setBlock] = useState("disabled");

    const handleAdd = () => {
        props.addSell({ product, user, price, amountPaid, paymentType });
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

    const handlePaymentTypeChange = e => {
        setPaymentType(e.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Nova venda
        </Typography>
                <Autocomplete
                    id="imeis"
                    style={{ width: 270, margin: '1em' }}
                    options={props.imeis}
                    getOptionLabel={option => option.imei}
                    renderInput={params => (
                        <TextField
                            {...params}
                            required
                            label="IMEI"
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
                    style={{ width: 270, margin: '1em' }}
                    options={props.users}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            required
                            label="Cliente"
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
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Forma de pagamento</FormLabel>
                    <RadioGroup aria-label="paymentType" name="paymentType" value={paymentType} onChange={handlePaymentTypeChange}>
                        <FormControlLabel value={paymentTypes.CASH.name} control={<Radio color="primary" />} label={paymentTypes.CASH.label} />
                        <FormControlLabel value={paymentTypes.INSTALLMENT.name} control={<Radio color="primary" />} label={paymentTypes.INSTALLMENT.label} />
                    </RadioGroup>
                </FormControl>
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
    },
    formControl: {
        alignSelf: 'start',
        marginTop: '1em'
    }
}));
