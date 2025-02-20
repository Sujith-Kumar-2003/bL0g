// Import Firebase modules dynamically
(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js");
    const { getFirestore, collection, addDoc, getDocs } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js");

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB-Ax8lz2OMary2yozvHC8dWeZSjq8bNvA",
        authDomain: "blog-8cce0.firebaseapp.com",
        projectId: "blog-8cce0",
        storageBucket: "blog-8cce0.appspot.com",
        messagingSenderId: "415461650898",
        appId: "1:415461650898:web:5a9397504263bfb119180b",
        measurementId: "G-077G0ZV7VD"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Fetch and display posts
    async function fetchPosts() {
        const querySnapshot = await getDocs(collection(db, "posts"));
        let posts = [];
        querySnapshot.forEach(doc => posts.push(doc.data()));
        displayPosts(posts);
    }

    // Function to display posts
    function displayPosts(posts) {
        const blogPostsDiv = document.getElementById('blog-posts');
        blogPostsDiv.innerHTML = '<h2>Previous Posts</h2>';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h3>${post.title}</h3><p><em>${post.date}</em></p><p>${post.content}</p>`;
            blogPostsDiv.appendChild(postDiv);
        });
    }

    // Function to add a new blog post
    async function addPost() {
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const date = new Date().toLocaleDateString();

        if (title && content) {
            try {
                await addDoc(collection(db, "posts"), { title, content, date });
                alert("Post added successfully!");
                fetchPosts(); // Refresh posts
            } catch (error) {
                console.error("Error adding post: ", error);
                alert("Failed to add post. Check console for errors.");
            }
        } else {
            alert("Title and content cannot be empty.");
        }
    }

    // Function to switch tabs
    function showTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    // Make sure functions are globally accessible
    window.showTab = showTab;
    window.addPost = addPost;

    // Load posts when page loads
    fetchPosts();
})();
