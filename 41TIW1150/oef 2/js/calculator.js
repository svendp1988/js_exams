'use strict'
let array_data = [[7,8,9],[4,5,6],[1,2,3],[0,'.','=']];
let ul = document.createElement('ul');
let text = '';

function handleClick(event) {
    let symbol = event.target.textContent;
    if (symbol >= '0' && symbol <= 9) {
        text += symbol;
    }
    if (symbol === '=') {
        ul.appendChild(makeListItem(text));
        text = '';
    }
}

const handleLoad = () => {
    let table = document.createElement('table');
    for (let data of array_data) {
        let tr = makeTableRow(data);
        table.appendChild(tr);
    }
    document.getElementById('output_calculator').appendChild(table);
    document.getElementById('output_results').appendChild(ul);
}

const makeTableRow = (object) => {
    let tr = document.createElement('tr');
    let keys = Object.keys(object);
    for (let key of keys) {
        let td = document.createElement('td');
        td.setAttribute('class', 'button button_x');
        td.appendChild(document.createTextNode(object[key]));
        tr.appendChild(td);
    }
    return tr;
}

function makeListItem(text) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(text));
    return li;
}

window.addEventListener('load', handleLoad);
window.addEventListener('click', handleClick);

