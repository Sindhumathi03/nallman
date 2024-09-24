document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const appContainer = document.getElementById('appContainer');
    const usernameInput = document.getElementById('username');
    const loginButton = document.getElementById('loginButton');
    const postContent = document.getElementById('postContent');
    const postButton = document.getElementById('postButton');
    const postsContainer = document.getElementById('postsContainer');

    let currentUser = '';

    // Load posts from local storage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <p><strong>${post.username}</strong>: ${post.content}</p>
                <button class="likeButton" data-index="${index}">👍 (${post.likes || 0})</button>
                <button class="unlikeButton" data-index="${index}"> 👎</button>
                <button class="deleteButton" data-index="${index}">Delete</button>
                <p>Comments: ${post.comments ? post.comments.length : 0}</p>
                <div class="comments">
                    <input type="text" placeholder="Add a comment" class="commentInput" data-index="${index}">
                    <button class="commentButton" data-index="${index}">Comment 💬</button>
                    <div class="commentList"></div>
                </div>
            `;
            postsContainer.appendChild(postElement);
            loadComments(postElement.querySelector('.commentList'), post.comments || []);
        });
        addEventListeners();
    }

    // Load comments for a post
    function loadComments(commentListElement, comments) {
        commentListElement.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment;
            commentListElement.appendChild(commentElement);
        });
    }

    // Save posts to local storage
    function savePost(content, username) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content, username, likes: 0, comments: [] });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Handle the login button click
    loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            loginContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
            loadPosts();
        }
    });

    // Handle the post button click
    postButton.addEventListener('click', function() {
        const content = postContent.value.trim();
        if (content) {
            savePost(content, currentUser);
            postContent.value = '';
            loadPosts();
        }
    });

    // Add event listeners for buttons
    function addEventListeners() {
        addLikeButtonListeners();
        addUnlikeButtonListeners();
        addDeleteButtonListeners();
        addCommentButtonListeners();
    }

    // Add event listeners for like buttons
    function addLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.likeButton');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                likePost(index);
            });
        });
    }

    // Add event listeners for unlike buttons
    function addUnlikeButtonListeners() {
        const unlikeButtons = document.querySelectorAll('.unlikeButton');
        unlikeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                unlikePost(index);
            });
        });
    }

    // Like a post
    function likePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].likes = (posts[index].likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Unlike a post
    function unlikePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (posts[index].likes > 0) {
            posts[index].likes--;
        }
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Add event listeners for delete buttons
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                deletePost(index);
            });
        });
    }

    // Add event listeners for comment buttons
    function addCommentButtonListeners() {
        const commentButtons = document.querySelectorAll('.commentButton');
        commentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                const commentInput = document.querySelector(`.commentInput[data-index="${index}"]`);
                const comment = commentInput.value.trim();
                if (comment) {
                    addComment(index, comment);
                    commentInput.value = ''; // Clear input
                }
            });
        });
    }

    // Add a comment to a post
    function addComment(index, comment) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Delete a post
    function deletePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1); // Remove the post at the specified index
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Load posts when the page is loaded
    loadPosts();
});
