import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_PUBLIC_API_KEY",
    authDomain: "blog-8cce0.firebaseapp.com",
    projectId: "blog-8cce0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let posts = [];
    querySnapshot.forEach(doc => posts.push(doc.data()));
    displayPosts(posts);
}

async function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toLocaleDateString();

    if (title && content) {
        await addDoc(collection(db, "posts"), { title, content, date });
        fetchPosts();
    }
}

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

fetchPosts();
