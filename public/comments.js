
document.addEventListener('DOMContentLoaded', loadComments);

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

function loadComments() {
    const board = document.getElementById('commentBoard');
    const comments = JSON.parse(localStorage.getItem('pp_comment')) || [];

    if (comments.length === 0) {
        board.innerHTML = `<p style="text-align:center; font-family:'Comic Sans MS'; padding: 2vw; opacity: 0.5;">No cooments yet. Be the first to start a discussion ★★</p>`;
        return;
    }


    board.innerHTML = comments.map(c => `
        <div class="comment-card">
            <h3>@${c.name}</h3>
            <p>${c.msg}</p>
            <small>Posted on ${c.date}</small>
        </div>
    `).join('');
}