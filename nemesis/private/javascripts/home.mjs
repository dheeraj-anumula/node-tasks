import { getUser } from './user-service.mjs';

export function renderUser(user) {
    const welcome = document.querySelector('.welcome');
    welcome.innerText = `${welcome.innerText}, ${user.firstName} ${user.lastName}`;

    const email =document.querySelector('.email');
    email.innerHTML = user.email;
};

(async function init() {
    let user = await getUser();
    renderUser(user);
})();
