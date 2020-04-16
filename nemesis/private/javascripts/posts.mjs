import { getPosts ,getUser} from './user-service.mjs';


export function renderUser(user) {
    const email =document.querySelector('.email');
    email.innerHTML = user.email;
};

export function renderPosts(posts) {
    const parent = document.querySelector('.posts');
    const template= document.querySelector('#post');
    posts.map((post)=>{ 
        const cont = template.content.cloneNode(true);
        const id = cont.querySelector("#id");
        const message = cont.querySelector(".message");
        id.innerHTML=post.id;
        message.innerHTML=post.message;
        parent.appendChild(cont);
    });
};

(async function init() {
    let user= await getUser();
    renderUser(user)
    let posts = user.posts;
    renderPosts(posts);
})();
