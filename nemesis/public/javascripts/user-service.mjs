export async function getUser() {
    let response = await fetch('http://localhost:3000/api/user-details');
    let user = await response.json();
    return user;
}