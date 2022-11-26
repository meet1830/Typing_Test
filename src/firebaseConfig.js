// import firebase
import firebase from 'firebase/compat/app';

// import authentication for login signup
import 'firebase/compat/auth';

// for database
import 'firebase/compat/firestore';

// only these variables are visible in github and not information
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

// to initialize app firebase provides function initializeapp
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize auth
// this object will enable signup and login part
const auth = firebase.auth();

// for db
const db = firebaseApp.firestore();

export {auth, db};