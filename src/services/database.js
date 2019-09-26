const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const firebase.firestore();
 this.db = firebase.firestore();

export const addProduct = () => {
    db.collection('produto')
      .add({
        name: values.name,
        upc: values.upc,
        date: Date.now()
      })
      .then(function(docRef) {
        alert('Adicionado com sucesso');
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        alert('Ocorreu um erro, tente novamente');
        console.error('Error adding document: ', error);
      });
  };