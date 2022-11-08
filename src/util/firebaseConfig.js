import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyDioD326fD9ybiVMRFUBPTXNUw2MYKDwBE",
    authDomain: "motel-manager-247.firebaseapp.com",
    projectId: "motel-manager-247",
    storageBucket: "motel-manager-247.appspot.com",
    messagingSenderId: "93130090266",
    appId: "1:93130090266:web:0dd4601aef59b6745c2ea3"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;