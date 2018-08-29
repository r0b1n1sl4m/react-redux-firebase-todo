import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

export {
    firebase,
    auth,
    database
}
