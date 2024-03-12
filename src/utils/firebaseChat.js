import firebase, { getApp, getApps, initializeApp } from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAC9dzqlHaVR4GSycjFvSTXx7WYLzU3hf0",
    authDomain: "local-tradies-395506.firebaseapp.com",
    projectId: "local-tradies-395506",
    storageBucket: "local-tradies-395506.appspot.com",
    messagingSenderId: "740024087724",
    appId: "1:740024087724:web:7a1614bc453f7097a0db09",
    measurementId: "G-WSXR8LGTGV"
};

const apps= getApps()
export const firstTime = !apps.length 
const firebaseApp =  apps.length ? getApp() :initializeApp(firebaseConfig);
export default firebaseApp;