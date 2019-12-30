import firebase from "firebase";
import { firebaseConfig } from "./config-firebase";
import { formatValor } from "../utils/formatNumber";
import moment from "moment";
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

export const authUser = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

function addUpc(data) {
  var custo = data.custo.replace(/[^\d]+/g, "");
  var valor = data.valor.replace(/[^\d]+/g, "");
  var lucro = formatValor((valor - custo).toFixed());
  return new Promise(async res => {
    const upc = {
      name: data.name,
      custo: data.custo,
      valor: data.valor,
      lucro: lucro,
      date: moment().format("DD-MM-YYYY")
    };

    const result = await db.ref("upcs").push(upc);
    alert("Adicionado com sucesso!");
    res(result);
  });
}

function addUser(data) {
  const email = data.email;
  const name = data.name;
  return new Promise(async res => {
    const user = {
      name,
      email,
      date: moment().format("DD-MM-YYYY")
    };

    const result = await db.ref("users").push(user);
    alert("Adicionado com sucesso!");
    res(result);
  });
}

function addImei(data) {
  // return new Promise(async res => {

  const imei = {
    imei: data.imei,
    upcId: data.upcId,
    date: moment().format("DD-MM-YYYY"),
    situacao: "estoque"
  };
  const result = db.ref(`upcs/${data.upcId}/products`).push(imei);
  return result;
  //})
}

function getUpcs(callback) {
  db.ref("upcs").on("value", snap => {
    const results = snap.val();
    const resultArray = [];
    if (results) {
      Object.keys(results).map(async upc => {
        try {
          resultArray.push({
            ...results[upc],
            upcId: upc,
            quantTotal: countImeis(results[upc].products)
          });
        } catch (err) {
          console.log("get upcs error", err);
        }
      });
    }
    callback(resultArray);
  });
}

function getProducts(upcId) {
  return new Promise(res => {
    db.ref(`upcs/${upcId}/products`).on("value", snap => {
      const results = snap.val();
      const resultArray = [];
      if (results) {
        Object.keys(results).map(async product => {
          try {
            resultArray.push({
              ...results[product],
              productId: product
            });
          } catch (err) {
            console.log("get products error", err);
          }
        });
      }
      res(resultArray);
    });
  });
}

function getUsers() {
  return new Promise(res => {
    db.ref(`users`).on("value", snap => {
      const results = snap.val();
      const resultArray = [];
      if (results) {
        Object.keys(results).map(async user => {
          try {
            resultArray.push({
              ...results[user],
              userId: user
            });
          } catch (err) {
            console.log("get users error", err);
          }
        });
      }
      res(resultArray);
    });
  });
}

function getSells() {
  return new Promise(res => {
    db.ref(`sells`).on("value", snap => {
      const results = snap.val();
      const resultArray = [];
      if (results) {
        Object.keys(results).map(async sell => {
          try {
            resultArray.push({
              ...results[sell],
              sellId: sell
            });
          } catch (err) {
            console.log("get sells error", err);
          }
        });
      }
      res(resultArray);
    });
  });
}

function getUpcByID(id) {
  return new Promise(res => {
    db.ref(`upcs/${id}`).on("value", snap => {
      const results = snap.val();
      const resultArray = {
        nameUpc: results.name,
        upcId: id
      };

      res(resultArray);
    });
  });
}

function deleteImei(data) {
  db.ref(`upcs/${data.upcId}/products`)
    .child(data.productId)
    .remove();
  alert("Apagado com sucesso!");
  return true;
}

function deleteUpc(id) {
  db.ref("upcs")
    .child(id)
    .remove();
  alert("Apagado com sucesso!");
  return true;
}

function deleteUser(userId) {
  db.ref(`users`)
    .child(userId)
    .remove();
  alert("Apagado com sucesso");
  return true;
}

function lucroTotalProducts() {
  return new Promise(res => {
    db.ref("upcs").on("value", snap => {
      const results = snap.val();
      const resultArray = [];
      const lucro = "";
      if (results) {
        Object.keys(results).map(async upc => {
          try {
            lucro = results[upc].lucro + lucro;

            resultArray.push({
              ...results[upc],
              upcId: upc,
              quantTotal: countImeis(results[upc].products)
            });
          } catch (err) {
            console.log("get upcs error", err);
          }
        });
      }
      res(lucro);
    });
  });
}

function countImeis(imeis) {
  if (imeis) {
    return Object.keys(imeis).length;
  }
  return 0;
}

export const database = {
  authUser,
  addUpc,
  getProducts,
  getUpcs,
  getUpcByID,
  addImei,
  deleteImei,
  deleteUpc,
  lucroTotalProducts,
  getUsers,
  addUser,
  deleteUser,
  getSells
};
