const db = require('./db');

function findUser(username) {
    const result = db.filter(entry => {
        return entry.username === username;
    });

    if (result.length !== 1) {
        return null;
    }
    return result[0];
}

function addPost(username, message) {
    let postAdded=false;
    db.map((item) => {
        if (item.username === username) {
            item.posts.push({ id: item.posts.length + 1, message: message });
            postAdded=true;
        }
    })

    return postAdded;
}

module.exports ={findUser,addPost};