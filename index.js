function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

function showJoke(type) {
    const dadJokes = [
        "Why don't skeletons fight each other? They don't have the guts!",
        "I told my wife she should embrace her mistakes. She gave me a hug."
    ];

    const sexyJokes = [
        "Are you Wi-Fi? Because I'm really feeling a connection!",
        "Are you a magician? Because whenever I look at you, everyone else disappears."
    ];

    document.getElementById('joke').innerText = type === 'dad'
        ? dadJokes[Math.floor(Math.random() * dadJokes.length)]
        : sexyJokes[Math.floor(Math.random() * sexyJokes.length)];
}

function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toLocaleDateString();

    if (title && content) {
        const post = { title, content, date };
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        displayPosts();

        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
    }
}

function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = '<h2>Previous Posts</h2>';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h3>${post.title}</h3><p><em>${post.date}</em></p><p>${post.content}</p>`;
        blogPostsDiv.appendChild(postDiv);
    });
}

displayPosts();
