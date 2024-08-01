// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDm57yCxHBjx8_2dGsRXRxiij6RKvlyEMg",
    authDomain: "hspantryapp-53d07.firebaseapp.com",
    projectId: "hspantryapp-53d07",
    storageBucket: "hspantryapp-53d07.appspot.com",
    messagingSenderId: "209525153724",
    appId: "1:209525153724:web:1121e68c455a50e98e55b9"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { app, db, storage };