const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();
let promise = require('promise');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.addLabels = functions.firestore.document('images/{document}')
.onCreate((snap, context) => {
    console.log('SNAP', snap);
    console.log('CONTEXT', context);

    const data = snap.data();
    console.log('DATA IS IN', data);
    const imageUrl = "gs://" + data.bucket + "/" + data.fullPath;

    return Promise.resolve()
    .then(() => {
        return visionClient.labelDetection(imageUrl);
    })
    .then(results => {
      console.log('VISION data: ', results);

      const labelAnnotations = results[0].labelAnnotations;
      labels = [];

      labelAnnotations.forEach(label => {
        labels.push(label.description);
      });

      db.collection('images').doc(context.params.document).update({ labels })
      .then(res => console.log('labels added'))
      .catch(err => console.error(err));

      return labels;
    })
    .catch(err => console.error(err));
});



