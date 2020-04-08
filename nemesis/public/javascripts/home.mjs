import { getUser } from './user-service.mjs';

export function renderUserName(firstName, lastName) {
    const welcome = document.querySelector('.welcome');
    welcome.innerText = `${welcome.innerText}, ${firstName} ${lastName}`;
};

(async function init() {
    let user = await getUser();
    renderUserName(user.firstName,user.lastName);
})();