import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-Ax8lz2OMary2yozvHC8dWeZSjq8bNvA",
    authDomain: "blog-8cce0.firebaseapp.com",
    projectId: "blog-8cce0",
    storageBucket: "blog-8cce0.appspot.com",
    messagingSenderId: "415461650898",
    appId: "1:415461650898:web:5a9397504263bfb119180b",
    measurementId: "G-077G0ZV7VD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let posts = [];
    querySnapshot.forEach(doc => {
        let postData = doc.data();
        postData.id = doc.id; // Store Firestore document ID
        posts.push(postData);
    });
    displayPosts(posts);
}

function displayPosts(posts) {
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = '<h2>Previous Posts</h2>';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p><em>${post.date}</em></p>
            <p>${post.content}</p>
            <button class="btn delete-btn" onclick="deletePost('${post.id}')">Delete</button>
        `;
        blogPostsDiv.appendChild(postDiv);
    });
}

async function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toLocaleDateString();

    if (title && content) {
        try {
            const docRef = await addDoc(collection(db, "posts"), { title, content, date });
            alert("Post added successfully!");
            fetchPosts();
        } catch (error) {
            console.error("Error adding post: ", error);
            alert("Failed to add post. Check console for errors.");
        }
    } else {
        alert("Title and content cannot be empty.");
    }
}

async function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
        try {
            await deleteDoc(doc(db, "posts", postId));
            alert("Post deleted successfully!");
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post: ", error);
            alert("Failed to delete post. Check console for errors.");
        }
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

window.showTab = showTab;
window.addPost = addPost;
window.deletePost = deletePost;

fetchPosts();
