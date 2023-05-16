import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCTbYfpAXFv5BBNs859J99lmX7OZjyJ7r8",
	authDomain: "vue3-firebase-1e598.firebaseapp.com",
	projectId: "vue3-firebase-1e598",
	storageBucket: "vue3-firebase-1e598.appspot.com",
	messagingSenderId: "517924837404",
	appId: "1:517924837404:web:2021e1ced3a5c516c767d9",
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
