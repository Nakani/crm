import React, { useEffect, useState } from 'react';
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table";
import ModalUpc from "components/Modal/modalUpc"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from 'react-redux'
import { getListsUpc } from '../../reduxs/index'
import { database } from '../../services/database'
//Styles
import { Styles } from "./TableList.style"
const useStyles = Styles;

export default function TableList(props) {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [quantTotal, setTotal] = useState(0);
  const [totalLucro, setLucro] = useState(0);
  const [totalValor, setValor] = useState(0);
  const dispatch = useDispatch()
  const products = useSelector(state => state.productsReducer)

  useEffect(() => {
    getUpcs()
  }, [])

  useEffect(() => {
    setLists(products.products)
    totalUpcs(products.products)
    somarLucros(products.products)
    somarValores(products.products)
  }, [products], [quantTotal], [totalLucro], [totalValor])

  function getUpcs() {
    getListsUpc(dispatch)
  }

  async function addUpc(data) {
    const result = await database.addUpc(data)
    if (result.key != null) {
      props.history.push('/admin/imeis/' + result.key);
    }
    else {
      alert('Por favor preencha  o nome e o custo!')
    }
  }

  function editUpc(data) {

  }

  function delUpc(data) {
    const result = database.deleteUpc(data)
    if (result) {
      getUpcs()
    }
  }

  function totalUpcs(products) {
    if (products.length > 0) {
      let total = quantTotal
      products.map((prop, key) => {
        total += prop.quantTotal
        setTotal(total)
      })
    }
  }

  function somarLucros(products) {
    if (products.length > 0) {
      let total = parseInt(0)
      let lucro = totalLucro
      let totalItens = quantTotal
      products.map((prop, key) => {
        total += prop.lucro * prop.quantTotal
        setLucro(total)
      })
    }
  }
  function somarValores(products) {
    if (products.length > 0) {
      let total = totalValor
      let totalItens = quantTotal
      products.map((prop, key) => {
        total += prop.valor * prop.quantTotal
        setValor(total)
      })
    }
  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total produtos</p>
              <h3 className={classes.cardTitle}>
                {quantTotal}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Lucros</p>
              <h3 className={classes.cardTitle}>
                R$: {totalLucro}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Valor</p>
              <h3 className={classes.cardTitle}>
                R$: {totalValor}
              </h3>
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
