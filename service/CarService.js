'use strict';
var admin = require("firebase-admin");


/**
 * Get car post.
 *
 * returns List
 **/
exports.carGET = function() {
  return new Promise(async function(resolve, reject) {
    // #1 Read
    const carCollection = admin.firestore().collection('cars');

    // #2 Read
    const docs = await carCollection.listDocuments();

    let docPromises = [];
    docs.forEach(async doc => {
      // Add all document read promises into single array
      docPromises.push(doc.get())
    });
    
    // #3 Read - multiple reads in parallel, x1 read per document
    let docSnapshots = await Promise.all(docPromises);
    let finalData = [];
    docSnapshots.forEach(snap => {
      // #4 Read - for each document snapshot read data
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
    const docSnap = newDoc.get();
    resolve((await docSnap).data());
  });
}

