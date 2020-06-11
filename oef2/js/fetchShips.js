/*
    For this exercise we are not allowed to use .innerHTML or alter anything in fleet.HTML.

    On load the countries are fetched via this .js file. The countries are to be displayed in a select element.

    When the button get_ships is clicked, the ships for the selected country are fetched and displayed in a ul element in the div_output.
    The fastest ship is displayed in red. There can be more than one fastest ship.
 */

window.addEventListener("load", handleWindowload);

function handleWindowload() {
    let url = 'http://localhost:3000/country/';
    generateSelect(url);
    let button = document.getElementById("get_ships").addEventListener("click", handleGetShips);

}

function handleGetShips() {
    let url = 'http://localhost:3000/ship/';
    let select = document.getElementById("select_ship");
    let id = select.options[select.selectedIndex].value;
    let divOutput = document.getElementById("div_output");
    clearElement(divOutput);
    fetch(`${url}?country_id=${id}`)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(ships => {
            divOutput.appendChild(generateUl(ships));
        })
        .catch(error => divOutput.appendChild(document.createTextNode(error)));
}

function clearElement(element) {
    while(element.hasChildNodes()) {
        element.remove(element.firstChild);
    }
}

function generateSelect(url) {
    let divSelect = document.getElementById("div_select");
    clearElement(divSelect);
    let select = document.createElement("select");
    select.setAttribute("id", "select_ship");
    fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(countries => {
            countries.forEach(country => {
                let option = document.createElement("option");
                option.setAttribute("value", country.id);
                option.innerText = country.name;
                select.appendChild(option);
            })
        })
        .catch(error => divSelect.appendChild(document.createTextNode(error)));
    divSelect.appendChild(select);
}

function generateUl(ships) {
    let ul = document.createElement("ul");
    ships.forEach(ship => {
        let fastestShips = findFastestShips(ships, ship);
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${ship.id}, ${ship.name}`));
        styleListItem(fastestShips, ship, li);
        ul.appendChild(li);
    })
    return ul;
}

function findFastestShips(ships, ship) {
    let fastestShips = [ships[0]];
    fastestShips.forEach(fastShip => {
        if (ship.speed > fastShip.speed) {
            fastestShips = [];
            fastestShips.push(ship);
        } else if (ship.speed == fastShip.speed) {
            fastestShips.push(ship);
        }
    })
    return fastestShips;
}

function styleListItem(fastestShips, ship, li) {
    if (fastestShips.includes(ship)) {
        li.style.color = "red";
    }
}
