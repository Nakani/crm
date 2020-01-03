import React, { useEffect, useState } from "react";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table";
import ModalUpc from "components/Modal/modalUpc";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from "react-redux";
import { getListsUpc } from "../../reduxs/index";
import { database } from "../../services/database";
import { formatValor } from "../../utils/formatNumber";
//Styles
import { Styles } from "./TableList.style";
const useStyles = Styles;

export default function TableList(props) {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer);

  useEffect(() => {
    getUpcs();
  }, []);

  useEffect(() => {
    totalUpcs();
    somarLucros();
    somarValores();
  }, [lists]);

  useEffect(() => {
    setLists(products.products);
  }, [products]);

  function getUpcs() {
    database.getUpcs(products => dispatch(getListsUpc(products)));
  }

  async function addUpc(data) {
    const result = await database.addUpc(data);
    if (result.key != null) {
      props.history.push("/admin/imeis/" + result.key);
    } else {
      alert("Por favor preencha  o nome e o custo!");
    }
  }

  function editUpc(data) {}

  function delUpc(data) {
    const result = database.deleteUpc(data);
    if (result) {
      getUpcs();
    }
  }

  function totalUpcs(data) {
    if (data != undefined && data.length > 0) {
      let total = 0;
      data.map((prop, key) => {
        total = total + prop.quantTotal;
      });
      return total;
    }
  }

  function somarLucros(data) {
    if (data != undefined && data.length > 0) {
      let total = 0;
      data.map((prop, key) => {
        let lucro = prop.lucro.replace(/[^\d]+/g, "");
        total += lucro * prop.quantTotal;
      });
      const result = formatValor(String(total));
      return result;
    }
  }
  function somarValores(data) {
    if (data != undefined && data.length > 0) {
      let total = 0;
      data.map((prop, key) => {
        let valores = prop.valor.replace(/[^\d]+/g, "");
        total += valores * prop.quantTotal;
      });
      const result = formatValor(String(total));
      return result;
    }
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
              <p className={classes.cardCategory}>Total produtos</p>
              <h3 className={classes.cardTitle}>{totalUpcs(lists)}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Valor</p>
              <h3 className={classes.cardTitle}>R$: {somarValores(lists)}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Lucros</p>
              <h3 className={classes.cardTitle}>R$: {somarLucros(lists)}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <ModalUpc addUpc={addUpc} />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de Produtos</h4>
              <p className={classes.cardCategoryWhite}>
                Gerencie seus produtos!
              </p>
            </CardHeader>
            <CardBody>
              <Table
                data={lists}
                history={props.history}
                editUpc={editUpc}
                delUpc={delUpc}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
