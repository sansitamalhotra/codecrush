import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAR2Foo8bdww1FUEjkz2ZV3leePGXGICcs",
    authDomain: "codecrush-6b41e.firebaseapp.com",
    projectId: "codecrush-6b41e",
    storageBucket: "codecrush-6b41e.firebasestorage.app",
    messagingSenderId: "218402804716",
    appId: "1:218402804716:web:1989dbc180c266a0e126c9",
    measurementId: "G-G34NRCL3WZ"
};
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)


export default app;