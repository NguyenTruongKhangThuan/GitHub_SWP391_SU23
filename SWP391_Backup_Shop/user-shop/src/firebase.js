import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtS_FIt7wy4aHAOR_eWIr0QBOy-Met6Vg",
  authDomain: "imagestorage-206cf.firebaseapp.com",
  databaseURL:
    "https://imagestorage-206cf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "imagestorage-206cf",
  storageBucket: "imagestorage-206cf.appspot.com",
  messagingSenderId: "541536422387",
  appId: "1:541536422387:web:4d514aee401ea0bec7ea86",
  measurementId: "G-D2TMH6R5RK",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
