import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAEefDbaJNmQQDPzSczF82nIGMVW2ujYMg",
  authDomain: "todo-app-559a4.firebaseapp.com",
  databaseURL: "https://todo-app-559a4.firebaseio.com",
  projectId: "todo-app-559a4",
  storageBucket: "todo-app-559a4.appspot.com",
  messagingSenderId: "182160325098",
  appId: "1:182160325098:web:583d2ca75a70bc0e805a93",
  measurementId: "G-RTSXBF895L"
})

const db = firebaseApp.firestore();

export default db;