const firebaseConfig = {
    apiKey: "AIzaSyB-Ax8lz2OMary2yozvHC8dWeZSjq8bNvA",
    authDomain: "blog-8cce0.firebaseapp.com",
    projectId: "blog-8cce0",
    storageBucket: "blog-8cce0.appspot.com",
    messagingSenderId: "415461650898",
    appId: "1:415461650898:web:5a9397504263bfb119180b",
    measurementId: "G-077G0ZV7VD"
};

// Load Firebase dynamically
(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js");
    const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js");
    const { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const OWNER_UID = "xKQOe0sOzcXWtMZcSa4VNQTxXhO2";

    function showTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    async function fetchPosts() {
        const querySnapshot = await getDocs(collection(db, "posts"));
        let posts = [];
        querySnapshot.forEach(doc => {
            let postData = doc.data();
            postData.id = doc.id;
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
                ${auth.currentUser && auth.currentUser.uid === OWNER_UID ? `<button class="btn delete-btn" onclick="deletePost('${post.id}')">Delete</button>` : ''}
            `;
            blogPostsDiv.appendChild(postDiv);
        });
    }

    async function addPost() {
        const user = auth.currentUser;
        if (!user || user.uid !== OWNER_UID) {
            alert("Only the owner can add posts!");
            return;
        }

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const date = new Date().toLocaleDateString();

        if (title && content) {
            try {
                await addDoc(collection(db, "posts"), { title, content, date });
                alert("Post added successfully!");
                fetchPosts();
            } catch (error) {
                console.error("Error adding post: ", error);
            }
        }
    }

    async function deletePost(postId) {
        const user = auth.currentUser;
        if (!user || user.uid !== OWNER_UID) {
            alert("Only the owner can delete posts!");
            return;
        }
        if (confirm("Are you sure you want to delete this post?")) {
            await deleteDoc(doc(db, "posts", postId));
            fetchPosts();
        }
    }

    async function login() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert(`Logged in as ${user.displayName}`);
            checkUserPermissions(user);
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }

    function checkUserPermissions(user) {
        if (user && user.uid === OWNER_UID) {
            document.getElementById("new-post").style.display = "block";
        } else {
            document.getElementById("new-post").style.display = "none";
        }
    }

    onAuthStateChanged(auth, (user) => {
        const userNameSpan = document.getElementById("user-name");
        const loginBtn = document.getElementById("login-btn");

        if (user) {
            userNameSpan.innerText = `Welcome, ${user.displayName}`;
            loginBtn.style.display = "none"; // Hide login button
        } else {
            userNameSpan.innerText = "Not logged in";
            loginBtn.style.display = "block";
        }

        checkUserPermissions(user);
    });

    function showJoke(type) {
        let dadJokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Why don’t eggs tell jokes? They’d crack each other up!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised!",
            "Your mom, cause it took her 9 months to create a joke like you.",
            "How did the Irish Jig get started? A: Too much Guinness and not enough bathrooms!",
            "Phil: “If you ain’t white, you ain’t right. Cut to black taxi driver throwing the luggage out of the cab.",
            "My friend thinks he is smart. He told me an onion is the only food that makes you cry, so I threw a coconut at his face.",
            "Roses are red. Your blood is too. You look like a monkey And belong in a zoo. Do not worry, I'll be there too. Not in the cage, But laughing at you.",
            "Boy: \"Boys are better than girls.\" Girl: Then why did God make girls first? Duh, you have to have a rough draft before the final copy.\""
        ];

        let sexyJokes = [
            "Are you a magician? Because whenever I look at you, everyone else disappears.",
            "Do you have a name, or can I call you mine?",
            "Is your name Google? Because you have everything I've been searching for.",
            "Are you made of copper and tellurium? Because you're Cu-Te.",
            "Do you believe in love at first sight, or should I walk by again?",
            "What did Winnie-the-Pooh say to his new love interest?  Show me honey.",
            "What’s hot, pink and wet?  A pig in a hot tub.",
            "Why couldn’t the lizard get a girlfriend?  Because he had a reptile dysfunction.",
            "Why are men like popcorn?  They satisfy you, but only for a little while.",
            "What kind of bees produce milk?  Boo-bees."
        ];

        let joke;
        if (type === "dad") {
            joke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
        } else if (type === "sexy") {
            joke = sexyJokes[Math.floor(Math.random() * sexyJokes.length)];
        } else {
            joke = "Oops! No jokes available.";
        }
        document.getElementById("joke").innerText = joke;
    }

    window.showJoke = showJoke;

    window.showTab = showTab;
    window.addPost = addPost;
    window.deletePost = deletePost;
    window.login = login;

    fetchPosts();
})();
