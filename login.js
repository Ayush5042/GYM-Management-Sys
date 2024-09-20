import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication
const auth = getAuth(app);

// Event listener for the form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the email and password values from the input fields
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login
            document.getElementById('loginMessage').innerText = "Login successful!";
            console.log("User signed in:", userCredential.user);
            // Redirect to the admin page
            window.location.href = "admin_page.html";
        })
        .catch((error) => {
            // Handle errors here
            const errorMessage = error.message;
            document.getElementById('loginMessage').innerText = `Error: ${errorMessage}`;
            console.error("Login failed:", error);
        });
});
