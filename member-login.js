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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Login Form Submit
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const memberID = document.getElementById('password').value; // Using 'password' field for member ID input

    if (!email || !memberID) {
        document.getElementById('loginMessage').innerText = "Email and Member ID are required!";
        return;
    }

    try {
        // Search Firestore for a member with the entered email
        const memberSnapshot = await db.collection('members').where('email', '==', email).get();

        if (memberSnapshot.empty) {
            document.getElementById('loginMessage').innerText = "No member found with this email!";
            return;
        }

        // Check if the entered memberID matches the document ID
        const memberDoc = memberSnapshot.docs[0];
        if (memberDoc.id === memberID) {
            document.getElementById('loginMessage').innerText = "Login successful!";
            
            // Check if the user is a member or admin
            const isAdmin = await db.collection('admins').doc(memberDoc.id).get().then(doc => doc.exists);

            if (isAdmin) {
                // If admin, redirect to the admin dashboard
                window.location.href = "admin-dashboard.html";
            } else {
                // If member, redirect to the member dashboard
                localStorage.setItem('memberID', memberDoc.id); // Save member's Firestore document ID
                window.location.href = "member-dashboard.html";
            }
        } else {
            document.getElementById('loginMessage').innerText = "Invalid Member ID!";
        }
    } catch (error) {
        console.error("Error logging in:", error);
        document.getElementById('loginMessage').innerText = `Error: ${error.message}`;
    }
});
