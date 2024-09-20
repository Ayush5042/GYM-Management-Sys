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

// Notification form submit
document.getElementById('notificationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const notificationContent = document.getElementById('notificationContent').value;
    
    if (!notificationContent) {
        document.getElementById('message').innerText = "Please write a notification!";
        return;
    }

    try {
        // Add the notification to Firestore
        await db.collection('notifications').add({
            content: notificationContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('message').innerText = "Notification sent successfully!";
        document.getElementById('notificationContent').value = ''; // Clear the textarea
    } catch (error) {
        console.error("Error adding notification:", error);
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
});
