import { getUser } from './user-service.mjs'

export function userDetails(user) {
    const fname = document.querySelector('.fname');
    const lname = document.querySelector('.lname');
    const age = document.querySelector('.age');
    const email = document.querySelector('.email');
    const address = document.querySelector('.address');
    fname.innerText = user.firstName;
    lname.innerText = user.lastName;
    age.innerText = user.age;
    email.innerText = user.email;
    address.innerText = user.address;

}

(async function init() {
    let user = await getUser();
    userDetails(user);
})();