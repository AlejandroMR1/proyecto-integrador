// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBKFWyy2YFiHDoCPYxH-z5cftfkJZLmAc0",
    authDomain: "proyecto-integrador-f6159.firebaseapp.com",
    projectId: "proyecto-integrador-f6159",
    storageBucket: "proyecto-integrador-f6159.firebasestorage.app",
    messagingSenderId: "878428690507",
    appId: "1:878428690507:web:3e31b7491be4128d0cd5ce",
    measurementId: "G-XM0FYGWZPB"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancia de Firestore
export const db = getFirestore(app);