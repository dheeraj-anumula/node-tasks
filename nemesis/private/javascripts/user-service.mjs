export async function getUser() {
    let response = await fetch('http://localhost:3000/api/user');
    let user = await response.json();
    return user;
}

export async function getPosts() {
    let response = await fetch('http://localhost:3000/api/posts');
    let posts = await response.json();
    return posts;
}