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
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h3>${title}</h3><p><em>${date}</em></p><p>${content}</p>`;

        document.getElementById('blog-posts').appendChild(postDiv);

        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
    }
}
