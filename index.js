import { getUsers, getUser, createUser, deleteUser, updateUser } from './api.js'
import { getDom, createTd, createTr, createDangerButton, createWarningButton } from './dom.js'

function createTableRowElement() {
    return {
        tr: createTr(),
        tdName: createTd(),
        tdEdit: createTd(),
        tdDelete: createTd(),
        editButton: createWarningButton(),
        deleteButton: createDangerButton(),
    };
}

function appendTableRowElement({
    editButton,
    deleteButton,
    tdName,
    tdEdit,
    tdDelete,
    tr,
    tbody
}) {
    tdEdit.appendChild(editButton);
    tdDelete.appendChild(deleteButton);
    tr.appendChild(tdName);
    tr.appendChild(tdEdit);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
}

async function showViewModal(e) {
    const modal = new bootstrap.Modal('#viewUserModal');
    let user = await getUser(e.id);
    let viewUserID = getDom('view-user-id');
    let viewUserName = getDom('view-user-name');
    let viewUserAge = getDom('view-user-age');

    viewUserID.value = user.id;
    viewUserName.value = user.name;
    viewUserAge.value = user.age;

    modal.show();
}

function showEditModal(e) {
    const modal = new bootstrap.Modal('#editUserModal');
    let updateUserID = getDom('edit-user-id');
    let updateUserName = getDom('edit-user-name');
    let updateUserAge = getDom('edit-user-age');
    
    updateUserID.value = e.id;
    updateUserName.value = e.name;
    updateUserAge.value = e.age;

    modal.show();
}

function editUserEvent() {
    let userId = getDom('edit-user-id');
    let userName = getDom('edit-user-name');
    let userAge = getDom('edit-user-age');

    updateUser(userId.value, {
        id: Number(userId.value),
        name: userName.value,
        age: Number(userAge.value),
    })
    .then(() => {
        initialize();
    });
}

function createUserEvent() {
    let userId = getDom('user-id');
    let userName = getDom('user-name');
    let userAge = getDom('user-age');

    createUser({
        id: Number(userId.value),
        name: userName.value,
        age: Number(userAge.value),
    })
    .then(() => {
        initialize();
    });
}

function deleteUserEvent(e) {
    deleteUser(e.id)
    .then(() => {
        initialize();
    });
}

function getUsersEvent(e) {
    let {
        tr,
        tdName,
        tdEdit,
        tdDelete,
        editButton,
        deleteButton,
    } = createTableRowElement();
    
    tdName.innerText = e.name;
    tdName.addEventListener('click', async () => showViewModal(e));

    editButton.innerText = 'edit';
    editButton.addEventListener('click', () => showEditModal(e));

    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', () => deleteUserEvent(e));

    let params = {
        editButton,
        deleteButton,
        tdName,
        tdEdit,
        tdDelete,
        tr,
        tbody
    };
    appendTableRowElement(params);
}

async function initialize() {
    let users = await getUsers();
    let tbody = getDom('tbody');
    let createButton = getDom('create-user');
    let editButton = getDom('edit-user');

    tbody.innerHTML = '';
    createButton.addEventListener('click', () => createUserEvent());
    editButton.addEventListener('click', () => editUserEvent());
    users.forEach(e => getUsersEvent(e));
}

initialize();
