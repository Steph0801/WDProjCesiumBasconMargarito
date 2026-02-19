
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = ref(db, 'pp_comment');

window.saveComment = function() {
    const name = document.getElementById('userName').value.trim();
    const msg = document.getElementById('userComment').value.trim();

    if (name === "" || msg === "") {
        alert("Hey nomnom! I would like to know your name and opinions ★");
        return;
    }

    push(commentsRef, {
        name: name,
        msg: msg,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    });

    document.getElementById('userName').value = "";
    document.getElementById('userComment').value = "";
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = ref(db, 'pp_comment');

// 4. Save Comment Function (Attached to window so HTML buttons see it)
window.saveComment = function() {
    const name = document.getElementById('userName').value.trim();
    const msg = document.getElementById('userComment').value.trim();

    if (name === "" || msg === "") {
        alert("Hey nomnom! I would like to know your name and opinions ★");
        return;
    }

    push(commentsRef, {
        name: name,
        msg: msg,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    });

    document.getElementById('userName').value = "";
    document.getElementById('userComment').value = "";
};

// 5. Delete Comment Function
window.deleteComment = function(id) {
    const itemRef = ref(db, `pp_comment/${id}`);
    remove(itemRef);
};

// 6. Real-time Listener (Automatically updates the board)
onValue(commentsRef, (snapshot) => {
    const board = document.getElementById('commentBoard');
    const data = snapshot.val();

    if (!data) {
        board.innerHTML = `<p style="text-align:center; font-family:'Comic Sans MS'; padding: 2vw; opacity: 0.5;">No comments yet. Be the first to start a discussion ★★</p>`;
        return;
    }

    // Convert object to array and sort (Newest first)
    const commentsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
    })).sort((a, b) => b.timestamp - a.timestamp);

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

/*window.saveComment = function() {
    const name = document.getElementById('userName').value.trim();
    const msg = document.getElementById('userComment').value.trim();

    if (name === "" || msg === "") {
        alert("Hey nomnom! I would like to know your name and opinions ★");
        return;
    }

function saveComment() {
    const name = document.getElementById('userName').value.trim();
    const msg = document.getElementById('userComment').value.trim();

    if (name === "" || msg === "") {
        alert("Hey nomnom! I would like to know your name and opinions ★");
        return;
    }

    const newComment = {
        id: Date.now(),
        name: name,
        msg: msg,
        date: new Date().toLocaleDateString()
    };
    let comments = JSON.parse(localStorage.getItem('pp_comment')) || [];
    comments.unshift(newComment);
    localStorage.setItem('pp_comment', JSON.stringify(comments));
    document.getElementById('userName').value = "";
    document.getElementById('userComment').value = "";
    loadComments();
}
function deleteComment(id) {
    let comments = JSON.parse(localStorage.getItem('pp_comment')) || [];
    comments = comments.filter(c => c.id !== id);
    localStorage.setItem('pp_comment', JSON.stringify(comments));
    loadComments();
}

/*function loadComments() {
    const board = document.getElementById('commentBoard');
    const comments = JSON.parse(localStorage.getItem('pp_comment')) || [];

    if (comments.length === 0) {
        board.innerHTML = `<p style="text-align:center; font-family:'Comic Sans MS'; padding: 2vw; opacity: 0.5;">No comments yet. Be the first to start a discussion ★★</p>`;
        return;
    }
    board.innerHTML = comments.map(c => `
        <div class="comment-card">
            <h3>@${c.name}</h3>
            <p>${c.msg}</p>
            <small>Posted on ${c.date}</small>
        </div>
    `).join('');
}*/

/*function loadComments() {
    const board = document.getElementById('commentBoard');
    const comments = JSON.parse(localStorage.getItem('pp_comment')) || [];

    if (comments.length === 0) {
        board.innerHTML = `<p style="text-align:center; font-family:'Comic Sans MS'; padding: 2vw; opacity: 0.5;">No comments yet. Be the first to start a discussion ★★</p>`;
        return;
    }
    board.innerHTML = comments.map(c => `
        <div class="comment-card">
            <div class="comment-header">
                <h3>@${c.name}</h3>
                <button class="delete-btn" onclick="deleteComment(${c.id})">×</button>
            </div>
            <p>${c.msg}</p>
            <small>Posted on ${c.date}</small>
        </div>
    `).join('');
}