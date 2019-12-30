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
import { getSellsList, getAllImeis } from "../../reduxs/index";
import { database } from "../../services/database";
import ModalSell from "../../components/Modal/modalSell";

//Styles
import { Styles } from "./SellsTable.style";
const useStyles = Styles;

export default function SellsTable(props) {
  const classes = useStyles();
  const [sellsList, setSellsList] = useState([]);
  const [imeisList, setImeisList] = useState([]);
  const dispatch = useDispatch();
  const sells = useSelector(state => state.sellsReducer);
  const imeis = useSelector(state => state.imeisReducer);

  useEffect(() => {
    getSells();
    getImeis();
  }, []);

  useEffect(() => {
    setSellsList(sells.sells);
  }, [sells]);

  function getSells() {
    getSellsList(dispatch);
  }

  function getImeis() {
    getAllImeis(dispatch);
  }

  useEffect(() => {
    setImeisList(imeis.imeis);
  }, [imeis]);

  //   async function addSell(data) {
  //     const result = await database.addSell(data);
  //     if (result.key !== null) {
  //       window.location.reload();
  //     } else {
  //       alert("Por favor preencha as informações necessárias");
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
        <ModalSell imeis={imeisList} />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de Vendas</h4>
              <p className={classes.cardCategoryWhite}>Gerencie suas vendas!</p>
            </CardHeader>
            <CardBody>
              {/* <UsersTable
                data={usersList}
                history={props.history}
                deleteUser={deleteUser}
              /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
