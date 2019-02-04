function init() {
    createUsers();
    let user = getLoggedUser();
    if (user) grantAccess(user);
}

function onUserLogin() {
    let username = document.querySelector('.username').value;
    let password = document.querySelector('.password').value;
    let user = doLogin(username, password);
    if (user) {
        grantAccess(user);
    } else return;
}

function grantAccess(user) {
    document.querySelector('.login-form').style.display = 'none';
    let adminLink = '';
    if (user.isAdmin) adminLink = `<a href="admin.html" class="admin-link">Admin</a>`
    strHTML = `<div class="secret-content">
                <div class="post-username">Welcome,&nbsp;${user.username}.</div>
                ${adminLink}
                <div>Three may keep a secret, if two of them are dead.</div>
                <button class="btn logout" onclick="doLogout();">Logout</button>
             </div>`;
    document.querySelector('.content').innerHTML = strHTML;
}

function showWrongInput() {
    document.querySelector('.wrong-msg').style.visibility = 'visible';
    setTimeout(function () {document.querySelector('.wrong-msg').style.visibility = 'hidden';}, 5000);
}