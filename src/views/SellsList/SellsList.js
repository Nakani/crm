/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useLayoutEffect } from "react";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from "react-redux";
import { getSellsList } from "../../reduxs/index";
import ModalSell from "../../components/Modal/modalSell";
import { database } from "../../services/database";
import { convertStringToNumber } from '../../utils/convertStringToNumber';
import { formatValor } from '../../utils/formatNumber';

import SellsTable from "../../components/Table/SellsTable";
//Styles
import { Styles } from "./SellsList.style";
const useStyles = Styles;

export default function SellsList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [sellsList, setSellsList] = useState([]);
    const [usersList, setUsersList] = useState([{}]);
    const [imeisList, setImeisList] = useState([{}]);

    const sells = useSelector(state => state.sellsReducer);

    useEffect(() => {
        getSells();
    }, [])

    useEffect(() => {
        getImeis();
        getUsers();
    }, [sellsList])

    useEffect(() => {
        setSellsList(sells.sells);
    }, [sells]);

    function getSells() {
        getSellsList(dispatch);
    }

    function getUsers() {
        database.getUsers().then(users => setUsersList(users));
    }

    function getImeis() {
        database.getImeis().then(imeis => setImeisList(imeis));
    }

    function totalSells(data) {
        if (data === undefined) return 0;
        return data.length;
    }

    function totalSellsValue(data) {
        if (data === undefined) return `R$ 0,00`;
        const total = data.reduce((pre, cur) => pre + convertStringToNumber(cur.price), 0);

        return `R$ ${formatValor(total.toFixed(2))}`
    }


    function totalPendingValue(data) {
        console.log(data)
        if (data === undefined) return `R$ 0,00`;
        const total = data.reduce((pre, cur) => pre + cur.pendingAmount, 0);

        return `R$ ${formatValor(total.toFixed(2))}`
    }

    async function addSell(data) {
        const result = await database.addSell(data);
        if (result.key !== null) {
            window.location.reload();
        } else {
            alert("Verifique as informações.");
        }
    }

    async function addPayment(data) {
        await database.addPaymentToSell(data);
        window.location.reload();
    }

    async function deleteSell(sellId) {
        await database.deleteSell(sellId);
        window.location.reload();
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total de vendas</p>
                            <h3 className={classes.cardTitle}>
                                {totalSells(sellsList || [])}
                            </h3>
                        </CardHeader>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total das vendas</p>
                            <h3 className={classes.cardTitle}>
                                {sellsList.length > 1 && totalSellsValue(sellsList)}
                            </h3>
                        </CardHeader>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total pendente</p>
                            <h3 className={classes.cardTitle}>
                                {sellsList.length > 1 && totalPendingValue(sellsList)}
                            </h3>
                        </CardHeader>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <ModalSell imeis={imeisList} users={usersList} addSell={addSell} />
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Lista de Vendas</h4>
                            <p className={classes.cardCategoryWhite}>Gerencie suas vendas!</p>
                        </CardHeader>
                        <CardBody>
                            {sellsList.length > 0 ? (
                                <SellsTable
                                    data={sellsList}
                                    history={props.history}
                                    addPayment={addPayment}
                                    deleteSell={deleteSell}
                                />
                            ) : (
                                    <span>Nenhuma venda realizada</span>
                                )}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}
