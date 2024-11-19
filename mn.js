document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.getElementById('postContent');
    const postButton = document.getElementById('postButton');
    const postsContainer = document.getElementById('postsContainer');
    const loginContainer = document.getElementById('loginContainer');
    const mainContainer = document.getElementById('mainContainer');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    if (localStorage.getItem('username')) {
        showMainContainer();}
  loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username && password) {
            localStorage.setItem('username', username);
            showMainContainer();} else {
            loginError.classList.remove('hidden');}
    });
    function showMainContainer() {
        loginContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        loadPosts(); }
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <p>${post.content}</p>
                <button class="likeButton" data-index="${index}">👍 (${post.likes || 0})</button>
                <button class="unlikeButton" data-index="${index}">👎</button>
                <button class="deleteButton" data-index="${index}">Delete</button>
                <p>Comments: ${post.comments ? post.comments.length : 0}</p>
                <div class="comments">
                    <input type="text" placeholder="Add a comment" class="commentInput" data-index="${index}">
                    <button class="commentButton" data-index="${index}">Comment 💬</button>
                    <div class="commentList"></div>
                </div>
            `;
            postsContainer.appendChild(postElement);
            loadComments(postElement.querySelector('.commentList'), post.comments || []); });
        addEventListeners(); }
function loadComments(commentListElement, comments) {
        commentListElement.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment;
            commentListElement.appendChild(commentElement); }); }
    function savePost(content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content, likes: 0, comments: [], username: localStorage.getItem('username') });
        localStorage.setItem('posts', JSON.stringify(posts));}
    postButton.addEventListener('click', function() {
        const content = postContent.value.trim();
        if (content) {
            savePost(content);
            postContent.value = '';
            loadPosts();  }
    });
    function addEventListeners() {
        addLikeButtonListeners();
        addUnlikeButtonListeners();
        addDeleteButtonListeners();
        addCommentButtonListeners();}
    function addLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.likeButton');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                likePost(index);});
        });}
    function addUnlikeButtonListeners() {
        const unlikeButtons = document.querySelectorAll('.unlikeButton');
        unlikeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                unlikePost(index);});
        }); }
    function likePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].likes = (posts[index].likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();}
    function unlikePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (posts[index].likes > 0) {
            posts[index].likes--; }
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();}
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                deletePost(index); }); }); }
    function addCommentButtonListeners() {
        const commentButtons = document.querySelectorAll('.commentButton');
        commentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                const commentInput = document.querySelector(`.commentInput[data-index="${index}"]`);
                const comment = commentInput.value.trim();
                if (comment) {
                    addComment(index, comment);
                    commentInput.value = ''; }});});}
    function addComment(index, comment) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].comments.push(`${localStorage.getItem('username')}: ${comment}`);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); }
    function deletePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); }});
