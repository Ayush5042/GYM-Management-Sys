
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

// Fetch and display notifications
const notificationList = document.getElementById('notificationList');

const loadNotifications = async () => {
    try {
        const snapshot = await db.collection('notifications').orderBy('timestamp', 'desc').get();

        notificationList.innerHTML = ''; // Clear any existing notifications

        snapshot.forEach(doc => {
            const notification = doc.data();
            const notificationElement = document.createElement('div');
            notificationElement.classList.add('notification');
            notificationElement.innerHTML = `
                <p>${notification.content}</p>
                <span>${new Date(notification.timestamp.toDate()).toLocaleString()}</span>
            `;
            notificationList.appendChild(notificationElement);
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
};

// Load notifications on page load
loadNotifications();
