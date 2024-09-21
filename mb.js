document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.getElementById('postContent');
    const postButton = document.getElementById('postButton');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from local storage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <p>${post.content}</p>
                <button class="likeButton" data-index="${index}">Like (${post.likes || 0})</button>
            `;
            postsContainer.appendChild(postElement);
        });
        addLikeButtonListeners();
    }

    // Save posts to local storage
    function savePost(content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content, likes: 0 });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Handle the post button click
    postButton.addEventListener('click', function() {
        const content = postContent.value.trim();
        if (content) {
            savePost(content);
            postContent.value = '';
            loadPosts();
        }
    });

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

    // Like a post
    function likePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].likes = (posts[index].likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Load posts when the page is loaded
    loadPosts();
});
