import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDEa2kc1t-W2zWLxLyxIBAn82IVf9MPLb8",
    authDomain: "vue-location-babastudio.firebaseapp.com",
    databaseURL: "https://vue-location-babastudio.firebaseio.com",
    projectId: "vue-location-babastudio",
    storageBucket: "vue-location-babastudio.appspot.com",
    messagingSenderId: "1031275424808",
    appId: "1:1031275424808:web:2c63d84a9d03ffb510191d",
    measurementId: "G-0BBX0F6MT6"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebase.firestore();  