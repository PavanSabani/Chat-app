
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {doc,Timestamp,getFirestore, setDoc} from 'firebase/firestore';
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  apiKey: "AIzaSyDmCNjyK7jQrHagsui-JH06qPLvL3t46NQ",
  authDomain: "zynk-app-gs.firebaseapp.com",
  projectId: "zynk-app-gs",
  storageBucket: "zynk-app-gs.firebasestorage.app",
  messagingSenderId: "295961011830",
  appId: "1:295961011830:web:f5e2d904ee514046b5e157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey there, I am using Zynk",
            lastSeen: Timestamp.now(),
        });

        await setDoc(doc(db,"chats",user.uid), {
            chatData: []
        });

    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export {signup,login}