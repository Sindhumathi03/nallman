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
            
            // Create a like button and like count
            const likeButton = document.createElement('button');
            likeButton.className = 'like-button';
            likeButton.textContent = 'Like';
            likeButton.dataset.index = index;
            
            const likeCount = document.createElement('span');
            likeCount.className = 'like-count';
            likeCount.textContent = `Likes: ${post.likes || 0}`;

            // Create a div to contain the post content and the like button
            postElement.innerHTML = `<p>${post.content}</p>`;
            postElement.appendChild(likeButton);
            postElement.appendChild(likeCount);

            // Add event listener to the like button
            likeButton.addEventListener('click', function() {
                likePost(index);
            });

            postsContainer.appendChild(postElement);
        });
    }

    // Save posts to local storage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Handle liking a post
    function likePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (!posts[index].likes) {
            posts[index].likes = 0;
        }
        posts[index].likes++;
        savePosts(posts);
        loadPosts(); // Reload posts to update like count
    }

    // Handle the post button click
    postButton.addEventListener('click', function() {
        const content = postContent.value.trim();
        if (content) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push({ content: content, likes: 0 });
            savePosts(posts);
            postContent.value = '';
            loadPosts();
        }
    });

    // Load posts when the page is loaded
    loadPosts();
});
