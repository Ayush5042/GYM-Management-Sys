// admin-dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhVZ3cqgFPJkHraeNU-W_pyD_PWVde4Yk",
    authDomain: "gymm-43503.firebaseapp.com",
    projectId: "gymm-43503",
    storageBucket: "gymm-43503.appspot.com",
    messagingSenderId: "1052065572860",
    appId: "1:1052065572860:web:e0505c6362bd3d4b247479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Listen for authentication state change
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, now check if they are an admin
        const userRef = doc(db, "users", user.uid);  // Assuming 'users' collection in Firestore
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().role === "admin") {
            console.log("Welcome, admin!");
            // Admin has access, you can load the admin dashboard
        } else {
            // Not an admin, redirect or show an error
            alert("You do not have access to this page.");
            window.location.href = "login.html"; // Redirect to login page
        }
    } else {
        // No user is signed in, redirect to login page
        window.location.href = "login.html";
    }
});

// Sign out admin if needed
const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html"; // Redirect to login page after sign-out
    }).catch((error) => {
        console.error("Sign-out error:", error);
    });
});
