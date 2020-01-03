import React, { useEffect, useState } from "react";
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

//Styles
import { Styles } from "./SellsTable.style";
const useStyles = Styles;

export default function SellsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sellsList, setSellsList] = useState([{}]);
  const [usersList, setUsersList] = useState([{}]);
  const [imeisList, setImeisList] = useState([{}]);

  const sells = useSelector(state => state.sellsReducer);

  useEffect(() => {
    getSells();
    getUsers();
    getImeis();
  }, []);

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

  //   async function addSell(data) {
  //     const result = await database.addSell(data);
  //     if (result.key !== null) {
  //       window.location.reload();
  //     } else {
  //       alert("Por favor preencconst users = useSelector(state => state.usersReducer);ha as informações necessárias");
  //     }
  //   }

  //   function deleteSell(data) {
  //     const result = database.deleteSell(data);
  //     if (result) {
  //       getSells();
  //     }
  //   }

  function totalSells(data) {
    if (data === undefined) return 0;
    return data.length;
  }

  const addSell = things => {
    database.addSell(things);
  };

  console.log(sellsList);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total das vendas</p>
              <h3 className={classes.cardTitle}>
                {totalSells(sellsList || [])}
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
                <h1>Oi</h1>
              ) : (
                <span>Nenhuma venda realizada</span>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
