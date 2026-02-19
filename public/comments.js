// 1. Imports from Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// 2. Your Firebase Configuration (DO NOT CHANGE)
const firebaseConfig = {
    apiKey: "AIzaSyCYOSecVZXlBgP-d676mWcBtpk7IkY1FJA",
    authDomain: "pizza-papi-comments.firebaseapp.com",
    databaseURL: "https://pizza-papi-comments-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pizza-papi-comments",
    storageBucket: "pizza-papi-comments.firebasestorage.app",
    messagingSenderId: "691303840933",
    appId: "1:691303840933:web:744381d5196b57c495214c",
    measurementId: "G-TJ43CJK3C1"
};

// 3. Initialize Firebase & Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = ref(db, 'pp_comment');

// 4. Function to Save/Post (Attached to window so HTML button can find it)
window.saveComment = function() {
    const name = document.getElementById('userName').value.trim();
    const msg = document.getElementById('userComment').value.trim();

    if (name === "" || msg === "") {
        alert("Hey nomnom! I would like to know your name and opinions ★");
        return;
    }

    // This sends the data to the Cloud
    push(commentsRef, {
        name: name,
        msg: msg,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    });

    document.getElementById('userName').value = "";
    document.getElementById('userComment').value = "";
};

// 5. Function to Delete
window.deleteComment = function(id) {
    const itemRef = ref(db, `pp_comment/${id}`);
    remove(itemRef);
};

// 6. REALTIME LISTENER: This makes you see others' comments instantly
onValue(commentsRef, (snapshot) => {
    const board = document.getElementById('commentBoard');
    const data = snapshot.val();

    if (!data) {
        board.innerHTML = `<p style="text-align:center; font-family:'Comic Sans MS'; padding: 2vw; opacity: 0.5;">No comments yet. Be the first to start a discussion ★★</p>`;
        return;
    }

    // Convert the database object into an array and sort by Newest First
    const commentsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
    })).sort((a, b) => b.timestamp - a.timestamp);

    // Render the comments to the screen
    board.innerHTML = commentsArray.map(c => `
        <div class="comment-card">
            <div class="comment-header">
                <h3>@${c.name}</h3>
                <button class="delete-btn" onclick="deleteComment('${c.id}')">×</button>
            </div>
            <p>${c.msg}</p>
            <small>Posted on ${c.date}</small>
        </div>
    `).join('');
});