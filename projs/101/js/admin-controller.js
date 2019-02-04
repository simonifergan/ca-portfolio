function init() {
    let user = getLoggedUser();
    if (!user || !user.isAdmin) {
        window.location.href = 'index.html';
        return;
    } else if (user.isAdmin) {
        document.querySelector('.admin-name').innerHTML = user.username + '.';
        onGenerateUsersTable();
    }
}

function onGenerateUsersTable(sortBy = 'name') {
    let users = getUsersForDisplay(sortBy);

    htmlStr = ` <label for="filter-table">Display by:</label>
                <select class="filter-table" onchange="onFilterBy(this.value, 'table');">
                    <option value="">--Choose an option--</option>
                    <option value="login">Last Login</option>
                    <option value="name">Alphabetically</option>
                </select>
                <table class="users-table">
                <tbody>
                    <tr class="tr-headers">
                        <th>Username</th>
                        <th>Last Login</th>
                        <th>Authorizations</th>
                    </tr>`;

    htmlStrs = users.map(user => {
        let authStatus = (user.isAdmin) ? 'Administrator' : 'User';
        let lastLogin = (user.lastLoginTime) ? stringifyTimestamp(user.lastLoginTime) : 'No recent login';
        return `<tr class="tr-user">
                    <td>${user.username}</td>
                    <td>${lastLogin}</td>
                    <td>${authStatus}</td>
                </tr>`;
    })
    htmlStr += htmlStrs.join('') + `</tbody></table>`;
    document.querySelector('.content').innerHTML = htmlStr;
}

function onGenerateUsersIcons(sortBy = 'name') {
    let users = getUsersForDisplay(sortBy);

    htmlStrs = users.map(user => {
        let authStatus = (user.isAdmin) ? 'Administrator' : 'User';
        let lastLogin = (user.lastLoginTime) ? stringifyTimestamp(user.lastLoginTime) : 'No recent login';
        return `<div class="user">
                    <div onclick="onOpenUserModal(${user.id});">${user.username}</div>
                    <img onclick="onOpenUserModal(${user.id});" class="user-icon" src="img/${user.iconSrc}" 
                         alt="${user.username}'s icon"/>
                    <div class="user-modal-bg id-${user.id}">
                        <div class="user-modal">
                            <div>Username: ${user.username}</div>
                            <div>Last login: ${lastLogin}</div>
                            <div>Authorization: ${authStatus}</div>
                            <button class="btn btn-close-modal" onclick="onCloseModal(event, ${user.id});">Close</button>
                        </div>
                    </div>
                </div>`;

    })

    htmlStrs = `<label for="filter-table">Display by:</label>
                <select class="filter-table" onchange="onFilterBy(this.value, 'icons');">
                    <option value="">--Choose an option--</option>
                    <option value="login">Last Login</option>
                    <option value="name">Alphabetically</option>
                </select>
                <div class="users-icons">
                    ${htmlStrs.join('')}
                </div>`;
    document.querySelector('.content').innerHTML = htmlStrs;
}

function onOpenUserModal(id) {
    id = parseInt(id);
    document.querySelector(`.id-${id}`).classList.toggle('show-modal')
}

function onCloseModal(ev, id) {
    ev.stopPropagation();
    id = parseInt(id);
    document.querySelector(`.id-${id}`).classList.toggle('show-modal');
}

function onFilterBy(value, generate) {
    if (generate === 'table') onGenerateUsersTable(value);
    else onGenerateUsersIcons(value);
}

function onReturnToHomepage() {
    window.location.href = 'index.html';
}

