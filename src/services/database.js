import firebase from 'firebase';
import { firebaseConfig } from './config-firebase'
import moment from "moment";
const app = firebase.initializeApp(firebaseConfig)
const db = app.database()

function addUpc(data) {
  return new Promise(async res => {

    const upc = {
      name: data.name,
      custo: data.custo,
      valor: data.valor,
      lucro: data.valor - data.custo,
      date: moment().format('DD-MM-YYYY'),
    }
    const result = await db.ref('upcs').push(upc)
    res(result)
  })
}

function addImei(data) {
  return new Promise(async res => {

    const imei = {
      imei: data.imei,
      upcId: data.upcId,
      date: moment().format('DD-MM-YYYY'),
      situacao: '0'
    }
    const result = await db.ref('products').push(imei)
    res(result)
  })
}


function getUpcs() {
  return new Promise(res => {
    db.ref('upcs')
      .on('value', snap => {
        const results = snap.val()
        const resultArray = []
        if (results) {
          Object.keys(results).map(async upc => {
            try {
            // let imeis = await getProducts(upc)
             // console.log(imeis.length)
             //let totalImei = imeis.length
              resultArray.push({
                ...results[upc],
                upcId: upc,
               //quantTotal:String(quantTotal)
              })
            } catch (err) {
              console.log('get upcs error', err)
            }
          })
        }
        console.log(resultArray)
        res(resultArray)
      })
  })
}


function getProducts(upcId) {
  return new Promise(res => {
    db.ref('products').orderByChild("upcId").equalTo(upcId)
      .on('value', snap => {
        const results = snap.val()
        const resultArray = []
        if (results) {
          Object.keys(results).map(async product => {
            try {
              resultArray.push({
                ...results[product],
                productId: product,
              })
            } catch (err) {
              console.log('get products error', err)
            }
          })
        }
        console.log(resultArray)
        res(resultArray)
      })
  })
}

function getUpcByID(id) {
  return new Promise(res => {
    db.ref(`upcs/${id}`)
      .on('value', snap => {
        const results = snap.val()
        const resultArray = []
        resultArray.push({
          ...results,
          upcId: id,
        })
        res(results)
      })
  })
}

function deleteImei(id) {
  db.ref('products').child(id).remove();
}
function deleteUpc(id) {
  db.ref('upcs').child(id).remove();
}

export const database = {
  addUpc,
  getProducts,
  getUpcs,
  getUpcByID,
  addImei,
  deleteImei,
  deleteUpc
}