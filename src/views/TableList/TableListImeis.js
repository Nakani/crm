import React, { useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import { useAsync } from "react-use";
import GridContainer from "components/Grid/GridContainer.js";
import TableImei from "components/Table/TableImei";
import ModalImei from 'components/Modal/modalImei';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from 'react-redux'
import { getListsImei } from '../../reduxs/index'
import { database } from '../../services/database'
//Styles
import { Styles } from "./TableList.style"
const useStyles = Styles;

export default function TableListImeis(props) {
  const { id } = props.match.params
  const imeis = useSelector(state => state.imeisReducer)
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
    getImeis()
  }, [])

  useEffect(() => {
    setLists(imeis.imeis)
  }, [imeis])

  function getImeis() {
    getListsImei(dispatch, id)
  }

  function addImei(data) {
    if (data != null && data.imei.length == 15) {
      const result = database.addImei(data)
      if (result.key != null) {
        getImeis()
      }
    }
  }

  function editImei(data) {
    console.log('editar imei')
  }

  function delImei(data) {
    const result = database.deleteImei(data)
    if (result) {
      getImeis()
    }
  }
  console.log('imeis', lists)
  return (
    <GridContainer>
      <ModalImei data={id} addImei={addImei} />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lista de Imeis</h4>
            <p className={classes.cardCategoryWhite}>
              Gerencie seus Imeis!
            </p>
          </CardHeader>
          <CardBody>
            <TableImei
              data={lists}
              history={props.history}
              editImei={editImei}
              delImei={delImei}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
