const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");

let LIST = [];
let id = 0;

let data = localStorage.getItem("TODO");

let today = new Date();
let options = { weekday: 'long', month: 'short', day: 'numeric' };


dateElement.innerHTML = today.toLocaleDateString("en-US", options);

if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

function loadToDo(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

function addToDo(ToDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${ToDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

list.addEventListener("click", function(event) {
    let element = event.target;
    const elementJob = element.attributes.job.value;
    console.log(elementJob)

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
})

localStorage.setItem("TODO", JSON.stringify(LIST));

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            input.value = "";
            id++;
        }
    }
});

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})