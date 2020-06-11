const urlFestivals = "http://localhost:3000/performances/";

window.addEventListener("load", handleLoad);

function handleLoad() {
    let divOutput = document.getElementById("div_output");
    makeElementEmpty(divOutput);
    document.getElementById("get_all_performances").addEventListener("click", handleGetAllPerformances);
    document.getElementById("get_all_performances_on_date").addEventListener("click", handleGetPerformancesOnDate);
    document.getElementById("get_performance").addEventListener("click", handleGetPerformanceById);
    document.getElementById("post_performance").addEventListener("click", handlePostPerformance);
}

function handleGetAllPerformances() {
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    fetch(urlFestivals)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(festivals => {
            createTable(festivals, output);
        })
        .catch(error => output.appendChild(document.createTextNode(error)));
}

function handleGetPerformancesOnDate() {
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    let date = document.getElementById("date").value;
    fetch(`${urlFestivals}?play_date=${date}`)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(festivals => {
            createTable(festivals, output);
        })
        .catch(error => output.appendChild(document.createTextNode(error)));
}

function handleGetPerformanceById() {
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    let id = document.getElementById("id").value;
    fetch(`${urlFestivals}/${id}`)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(festival => createTable([festival], output))
        .catch(error => output.appendChild(document.createTextNode(error)));
}

function handlePostPerformance() {
    let output = document.getElementById("div_output");
    let name = document.getElementById("input_name").value;
    let play_date = document.getElementById("input_date").value;
    let description = document.getElementById("input_description").value;
    let festival = {name, play_date, description};
    makeElementEmpty(output);
    fetch(urlFestivals, {
        method: "POST",
        body: JSON.stringify(festival),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status == 201) {
                return response.json();
            }
            throw `Error with status ${response.status}`;
        })
        .then(festival => createTable([festival], output))
        .catch(error => output.appendChild(document.createTextNode(error)));
}

function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.remove(element.firstChild);
    }
}

function createTable(festivals, output) {
    let table = document.createElement("table");
    let first = true;
    for (let festival of festivals) {
        if (first) {
            let tr = makeTableRow(festival, first);
            table.append(tr);
            first = false;
        }
        let tr = makeTableRow(festival);
        table.append(tr);
    }
    output.appendChild(table);
}

function makeTableRow(object, header = false) {
    let tr = document.createElement("tr");
    let keys = Object.keys(object);
    for (let key of keys) {
        let type = "td";
        let value = object[key];
        if (header) {
            type = "th";
            value = key;
        }
        let td = document.createElement(type);
        td.appendChild(document.createTextNode(value));
        tr.appendChild(td);
    }
    return tr;
}

