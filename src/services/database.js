import firebase from 'firebase';
import { firebaseConfig } from './config-firebase'
import { formatValor } from '../utils/formatNumber'
import moment from "moment";
const app = firebase.initializeApp(firebaseConfig)
const db = app.database()


function addUpc(data) {
  var custo = data.custo.replace(/[^\d]+/g, '')
  var valor = data.valor.replace(/[^\d]+/g, '')
  var lucro = formatValor((valor - custo).toFixed())
  return new Promise(async res => {
    const upc = {
      name: data.name,
      custo: data.custo,
      valor: data.valor,
      lucro: lucro,
      date: moment().format('DD-MM-YYYY'),
    }

    const result = await db.ref('upcs').push(upc)
    alert('Adicionado com sucesso!')
    res(result)
  })
}

function addImei(data) {
  // return new Promise(async res => {

  const imei = {
    imei: data.imei,
    upcId: data.upcId,
    date: moment().format('DD-MM-YYYY'),
    situacao: 'estoque'
  }
  const result = db.ref(`upcs/${data.upcId}/products`).push(imei)
  return result
  //})
}

function getUpcs(callback) {
  db.ref('upcs')
    .on('value', snap => {
      const results = snap.val()
      const resultArray = []
      if (results) {
        Object.keys(results).map(async upc => {
          try {
            resultArray.push({
              ...results[upc],
              upcId: upc,
              quantTotal: countImeis(results[upc].products)
            })
          } catch (err) {
            console.log('get upcs error', err)
          }
        })
      }
      console.log(resultArray)
      callback(resultArray)
    })
}

function getProducts(upcId) {
  return new Promise(res => {
    db.ref(`upcs/${upcId}/products`)
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
        const resultArray = {
          nameUpc: results.name,
          upcId: id,
        }

        res(resultArray)
      })
  })
}

function deleteImei(data) {
  db.ref(`upcs/${data.upcId}/products`).child(data.productId).remove();
  alert('Apagado com sucesso!')
  return true
}

function deleteUpc(id) {
  db.ref('upcs').child(id).remove();
  alert('Apagado com sucesso!')
  return true
}

function lucroTotalProducts() {
  return new Promise(res => {
    db.ref('upcs')
      .on('value', snap => {
        const results = snap.val()
        const resultArray = []
        const lucro = ''
        if (results) {
          Object.keys(results).map(async upc => {
            try {
              lucro = results[upc].lucro + lucro

              resultArray.push({
                ...results[upc],
                upcId: upc,
                quantTotal: countImeis(results[upc].products)
              })


            } catch (err) {
              console.log('get upcs error', err)
            }
          })
        }
        res(lucro)
      })
  })
}

function countImeis(imeis) {
  if (imeis) {
    return Object.keys(imeis).length
  }
  return 0
}



export const database = {
  addUpc,
  getProducts,
  getUpcs,
  getUpcByID,
  addImei,
  deleteImei,
  deleteUpc,
  lucroTotalProducts
}