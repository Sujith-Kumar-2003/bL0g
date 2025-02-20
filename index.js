// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase Configuration (Ensure `storageBucket` is correct)
const firebaseConfig = {
    apiKey: "AIzaSyB-Ax8lz2OMary2yozvHC8dWeZSjq8bNvA",
    authDomain: "blog-8cce0.firebaseapp.com",
    projectId: "blog-8cce0",
    storageBucket: "blog-8cce0.appspot.com", // ✅ Corrected
    messagingSenderId: "415461650898",
    appId: "1:415461650898:web:5a9397504263bfb119180b",
    measurementId: "G-077G0ZV7VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch and display all posts
async function fetchPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let posts = [];
    querySnapshot.forEach(doc => posts.push(doc.data()));
    displayPosts(posts);
}

// Function to display posts on the webpage
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
        await addDoc(collection(db, "posts"), { title, content, date });
        fetchPosts(); // Refresh posts
    }
}

// Load posts when the page loads
fetchPosts();
