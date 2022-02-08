'use strict';
const urlBase = "https://jsonplaceholder.typicode.com"
const postsContainer = document.querySelector(".js-posts-container");
const postHighlightContainer = document.querySelector(".js-post-highlight-container");
const postHighlight = document.querySelector(".js-post-highlight");
const backBtn = document.querySelector(".js-button-back");

// Create HTML element for each post
function createPost(post){
    const postContainer = document.createElement('article');
    const postTitle = document.createElement('a');
    const postBody = document.createElement('p');
    const postHref =  urlBase + `/posts/${post.id}`;

    postTitle.textContent = post.title;
    postTitle.classList.add("posts__post-title");
    postTitle.setAttribute('href', postHref)

    postBody.textContent = post.body;
    postBody.classList.add("posts__post-body");

    postContainer.classList.add("posts__post")
    postContainer.append(postTitle, postBody);

    return postContainer;
};

function handlePostsData(data){
    // Empty container before displaying data
    postsContainer.innerHTML = "";
    data.forEach(post => {
        const newPost = createPost(post);
        postsContainer.append(newPost);
    });
};

function handleError(error){
    alert(error);
};

async function fetchPosts(url, handler) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        handler(data);
    }
    catch(error) {
        handleError(error);
    }
};
fetchPosts(urlBase + "/posts", handlePostsData);

function handleHighlightPost(data) {
    const highlightPost = createPost(data);
    postHighlight.append(highlightPost);
}

postsContainer.addEventListener("click", async function(event) {
    if( !event.target.classList.contains('posts__post-title')) return;
    event.preventDefault();
    postHighlight.innerHTML = "";
    
    await fetchPosts(event.target.getAttribute('href'), handleHighlightPost);
    postsContainer.classList.add("hidden");
    postHighlightContainer.classList.remove("hidden");
});

backBtn.addEventListener("click", async function(){
    await fetchPosts(urlBase + "/posts", handlePostsData);
    postsContainer.classList.remove("hidden");
    postHighlightContainer.classList.add("hidden");
});







