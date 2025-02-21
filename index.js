const firebaseConfig = {
    apiKey: "AIzaSyB-Ax8lz2OMary2yozvHC8dWeZSjq8bNvA",
    authDomain: "blog-8cce0.firebaseapp.com",
    projectId: "blog-8cce0",
    storageBucket: "blog-8cce0.appspot.com",
    messagingSenderId: "415461650898",
    appId: "1:415461650898:web:5a9397504263bfb119180b",
    measurementId: "G-077G0ZV7VD"
};

(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js");
    const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js");
    const { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    async function login() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            document.getElementById("user-name").textContent = user.displayName || user.email;
            document.getElementById("login-btn").style.display = "none";
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("user-name").textContent = user.displayName || user.email;
            document.getElementById("login-btn").style.display = "none";
        }
    });

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
            `;
            blogPostsDiv.appendChild(postDiv);
        });
    }

    document.getElementById("glitter-video").addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false);

    function showJoke(type) {
        let dadJokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Why don’t eggs tell jokes? They’d crack each other up!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised!",
            "Why did the glitter blush refuse to come off? Because it had more attachment issues than Nate Jacobs.",
            "Why don’t dads watch Euphoria? Because every episode makes them say, ‘Back in my day, high school wasn’t like this!"
        ];

        let sexyJokes = [
            "Are you a magician? Because whenever I look at you, everyone else disappears.",
            "Do you have a name, or can I call you mine?",
            "Is your name Google? Because you have everything I've been searching for.",
            "Are you made of copper and tellurium? Because you're Cu-Te.",
            "Do you believe in love at first sight, or should I walk by again?",
            ""
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

    function showTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    window.showJoke = showJoke;
    window.showTab = showTab;
    window.login = login;
    fetchPosts();
})();
