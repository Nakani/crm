import React, { useEffect, useState, useCallback } from "react";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import UsersTable from "components/Table/UsersTable";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList } from "../../reduxs/index";
import { database } from "../../services/database";
import ModalUser from "../../components/Modal/modalUser";

//Styles
import { Styles } from "./UsersList.style";
const useStyles = Styles;

export default function UserList(props) {
  const classes = useStyles();
  const [usersList, setUsersList] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer);

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUsersList(users.users);
  }, [users]);

  function getUsers() {
    getUsersList(dispatch);
  }

  async function addUser(data) {
    const result = await database.addUser(data);
    if (result.key !== null) {
      window.location.reload();
    } else {
      alert("Por favor preencha o nome e o email.");
    }
  }

  function deleteUser(data) {
    const result = database.deleteUser(data);
    if (result) {
      getUsers();
    }
  }

  function totalUsers(data) {
    if (data != undefined) {
      return data.length;
    }

    return 0;
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
              <p className={classes.cardCategory}>Total clientes</p>
              <h3 className={classes.cardTitle}>{totalUsers(usersList)}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <ModalUser addUser={addUser} />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de Clientes</h4>
              <p className={classes.cardCategoryWhite}>
                Gerencie seus clientes!
              </p>
            </CardHeader>
            <CardBody>
              <UsersTable
                data={usersList}
                history={props.history}
                deleteUser={deleteUser}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
