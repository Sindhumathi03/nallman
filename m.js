document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.getElementById('postContent');
    const postButton = document.getElementById('postButton');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from local storage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `<p>${post}</p>`;
            postsContainer.appendChild(postElement);
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    let count = 0;

    likeButton.addEventListener('click', () => {
        count += 1;
        likeCount.textContent = count;
    });
});

    // Save posts to local storage
    function savePost(content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(content);
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

    // Load posts when the page is loaded
    loadPosts();
});
