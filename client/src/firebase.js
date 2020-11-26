import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDfkaM34yro1K3NwAbkRX-3rbL1SQIb8H8',
  authDomain: 'olga-jewelry-5b577.firebaseapp.com',
  databaseURL: 'https://olga-jewelry-5b577.firebaseio.com',
  projectId: 'olga-jewelry-5b577',
  storageBucket: 'olga-jewelry-5b577.appspot.com',
  messagingSenderId: '573911162702',
  appId: '1:573911162702:web:76320ba63e66bf2a28481f',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//export

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
