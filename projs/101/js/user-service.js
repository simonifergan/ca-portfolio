var gUsers;
const USERS_KEY = 'users';
const LOGGEDIN_USER_KEY = 'loggedinUser';

function createUsers() {
    let users = getUsers();

    if (!users) {
        gUsers = [
            { id: 101, username: 'sensation', password: 'molecule', lastLoginTime: null, isAdmin: true, iconSrc: 'user.png' },
            { id: 102, username: 'anxious', password: 'chrome', lastLoginTime: null, isAdmin: false, iconSrc: 'user.png' },
            { id: 103, username: 'liberate', password: 'dongle', lastLoginTime: null, isAdmin: false, iconSrc: 'user.png' },
        ];
    } else gUsers = users;
}

function saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(gUsers));
}

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY));
}

function doLogin(username, password) {
    let user = gUsers.find(user => user.username === username);
    if (user && user.password === password) {
        user.lastLoginTime = Date.now();
        saveUsers();
        saveLoggedUser(user);
        return user;
    }
    showWrongInput();
    return null;
}

function saveLoggedUser(user) {
    localStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(LOGGEDIN_USER_KEY));
}

function doLogout() {
    saveLoggedUser(null);
    window.location.href = 'index.html';
}

function sortByLogin(users) {
    return users.sort((user1, user2) => user2.lastLoginTime - user1.lastLoginTime);
}

function sortByName(users) {
    return users.sort((user1, user2) => (user1.username > user2.username) ? 1 : -1);
}

function getUsersForDisplay(sortBy) {
    createUsers();
    let usersForDiplay = gUsers.slice();
    switch (sortBy) {
        case 'login':
            usersForDiplay = sortByLogin(usersForDiplay);
            break;
        case 'name':
            usersForDiplay = sortByName(usersForDiplay);
            break;
    }
    return usersForDiplay;
}