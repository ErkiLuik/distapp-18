'use strict';
var admin = require("firebase-admin");


/**
 * Get car post.
 *
 * returns List
 **/
exports.carGET = function() {
  return new Promise(async function(resolve, reject) {

    const carCollection = admin.firestore().collection('cars');

    const docs = await carCollection.listDocuments();

    let docPromises = [];
    docs.forEach(async doc => {
      docPromises.push(doc.get())
    });
    
    let docSnapshots = await Promise.all(docPromises);
    let finalData = [];
    docSnapshots.forEach(snap => {
      let snapshotData = snap.data();
      snapshotData['id'] = snap.id;
      finalData.push(snapshotData);
    });

    if (finalData.length > 0) {
      resolve(finalData);
    } else {
      resolve();
    }
  });
}


/**
 * Adds new car post.
 *
 * body Car 
 * no response value expected for this operation
 **/
exports.carsPOST = function(body) {
  return new Promise(async function(resolve, reject) {
    const carCollection = admin.firestore().collection('cars');

    const newDoc = await carCollection.add(body);
    resolve(newDoc);
  });
}

