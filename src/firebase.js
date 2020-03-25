import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions';

// FIREBASE config
var firebaseConfig = {
    apiKey: 'AIzaSyAwlN24oXYrAEceYn1XB3fpAHi5cEFqzNw',
    authDomain: 'baza-pytan.firebaseapp.com',
    databaseURL: 'https://baza-pytan.firebaseio.com',
    projectId: 'baza-pytan',
    storageBucket: 'baza-pytan.appspot.com',
    messagingSenderId: '361765519780',
    appId: '1:361765519780:web:18b81c5a7f7f3257d6c131'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const backendFunctions = firebase.functions();
