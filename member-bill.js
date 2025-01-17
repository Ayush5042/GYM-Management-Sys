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

// Get the member's ID from localStorage
const memberID = localStorage.getItem('memberID');

// Ensure the user is logged in and has a valid member ID
if (memberID) {
    loadMemberBills(memberID);
} else {
    console.error("No member ID found in localStorage. Redirect to login.");
    // Redirect to login page if needed
    window.location.href = "login.html";
}

// Load and display bills for the logged-in member using their ID
async function loadMemberBills(memberID) {
    try {
        const billsSnapshot = await db.collection('bills').where('memberID', '==', memberID).get();
        const billsTable = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
        billsTable.innerHTML = ''; // Clear existing rows

        if (billsSnapshot.empty) {
            billsTable.innerHTML = '<tr><td colspan="4">No bills found.</td></tr>';
            return;
        }

        billsSnapshot.forEach((doc) => {
            const bill = doc.data();
            const row = billsTable.insertRow();
            row.insertCell(0).innerText = doc.id;
            row.insertCell(1).innerText = bill.memberName;
            row.insertCell(2).innerText = bill.amount;
            row.insertCell(3).innerText = bill.billDate;
        });
    } catch (error) {
        console.error("Error loading bills: ", error);
    }
}
