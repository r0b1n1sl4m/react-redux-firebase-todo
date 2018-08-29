import { firebaseConfig } from './configs';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {
    firebase,
    auth,
    database
}
