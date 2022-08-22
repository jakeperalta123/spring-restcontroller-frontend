function createDom(tag) {
    return document.createElement(tag)
}

function createButton() {
    let button = createDom('button')
    button.classList.add('btn');
    return button;
}

export function createDangerButton() {
    let button = createButton()
    button.classList.add('btn-danger');
    return button;
}

export function createWarningButton() {
    let button = createButton()
    button.classList.add('btn-warning');
    return button;
}

export function createTd() {
    return createDom('td');
}

export function createTr() {
    return createDom('tr')
}

export function getDom(id) {
    return document.querySelector(`#${id}`)
}
