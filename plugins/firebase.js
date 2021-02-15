import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAWwuyEIu9NNVjzJUnmxBGVWabgj3CoR-M',
  authDomain: 'vuegame-17e97.firebaseapp.com',
  databaseURL: 'https://vuegame-17e97-default-rtdb.firebaseio.com',
  projectId: 'vuegame-17e97',
  storageBucket: 'vuegame-17e97.appspot.com',
  messagingSenderId: '889397416633',
  appId: '1:889397416633:web:57c7bb99e72ceca8b28168',
  measurementId: 'G-FEK8HQJ0GK'
}

// Initialize Firebase

firebase.initializeApp(firebaseConfig)

export default firebase
