/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from "react-redux";
import { getSellsList } from "../../reduxs/index";

import SellersTable from "../../components/Table/SellersTable";
import { Styles } from "./SellersList.style";
const useStyles = Styles;

export default function SellersList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [sellsList, setSellsList] = useState([]);

    const sells = useSelector(state => state.sellsReducer);

    useEffect(() => {
        getSells();
    }, [])

    useEffect(() => {
        setSellsList(sells.sells);
    }, [sells]);

    function getSells() {
        getSellsList(dispatch);
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Lista de Vendas</h4>
                            <p className={classes.cardCategoryWhite}>Dê uma olhada em suas vendas!</p>
                        </CardHeader>
                        <CardBody>
                            {sellsList.length > 0 ? (
                                <SellersTable
                                    data={sellsList}
                                    history={props.history}
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
