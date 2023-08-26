/****API JSON DATA****/
const {backup2} = require('./backup_json.json')

/*********FIREBASE*****/
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDj-QobEqvtY0A0-wRzVuafTLC9B4xcxkQ",
  authDomain: "canadian-university-filter.firebaseapp.com",
  databaseURL: "https://canadian-university-filter-default-rtdb.firebaseio.com",
  projectId: "canadian-university-filter",
  storageBucket: "canadian-university-filter.appspot.com",
  messagingSenderId: "556366278548",
  appId: "1:556366278548:web:690159ba50e625a6c06981"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Showing Json to Firebase Store
const db = firebase.firestore()

//Create user collection (backup) & add to dB
db.collection('universities').doc('univ').set(backup2)
    .then(() => {
        console.log("Backup data added successfully!");
    })
    .catch((error) => {
        console.error("Error adding backup data: ", error);
    });
