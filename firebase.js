import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBCGfgIY2c_KOZabhUfl2Yl8GCgXLq88AQ",
  authDomain: "fun-food-friends-5e289.firebaseapp.com",
  databaseURL: "https://fun-food-friends-5e289.firebaseio.com",
  projectId: "fun-food-friends-5e289",
  storageBucket: "",
  messagingSenderId: "670675647949"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
