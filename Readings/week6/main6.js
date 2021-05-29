const addButton = document.getElementById('add');
const toDoList = document.getElementById('startList');
const inputField = document.getElementById('what');
const filterOption = document.getElementById('filter');
// const listItems = document.getElementsByTagName('li');


//Event Listners
document.addEventListener('DOMContentLoaded',getLocal);
addButton.addEventListener('click', addList);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addList(event) {
    event.preventDefault();

    if (inputField === "" || inputField === null) {
        alert("You got to add something to do!");
    } else {
        //todo Div
        const listDiv = document.createElement("div");
        listDiv.id = "todo";
        //todo LI
        listDiv.classList.add("todo");
        const newItem = document.createElement('li');
        newItem.innerText = inputField.value;
        newItem.classList.add("listItem");
        listDiv.appendChild(newItem);
        //Add Item to local storage
        saveToLocal(inputField.value)
        //Completed task
        const completedButton = document.createElement("button");
        completedButton.innerText = "!";
        completedButton.classList.add("completed");
        listDiv.appendChild(completedButton);
        /*This is used when we want to just click directly on the item to mark off as checked. 
         newItem.addEventListener('click', function () {
             newItem.style.textDecoration = "line-through";
         })
        newItem.addEventListener('dblclick', function () {
             newItem.style.textDecoration = "none";
         })
         */

        //Delete todo
        const trashButton = document.createElement('button');
        trashButton.classList.add("delete");
        trashButton.innerText = "x";
        listDiv.appendChild(trashButton);
        //add to my todolist
        toDoList.appendChild(listDiv);
    }
    inputField.value = "";
}
/*
// If I want to complete by directly pressing on Item. 
function completed(x) {
    x.style.textDecoration = "line-through";
    x.style.color = "red";
}

function undoCompleted(x) {
    x.style.textDecoration = "none";
}
*/
function deleteCheck(e) {
    const item = e.target;
    //Delete TODO
    if (item.classList[0] === 'delete') {
        const todo = item.parentElement;
        removeLocalItems(todo);
        todo.remove();
    }
    //Check
    if (item.classList[0] === "completed") {
        const todo = item.parentElement;
        todo.classList.toggle('complete');
    }
    /*
    //Check with an animation
    todo.classList.add("fall");
    todo.addEventListener("transitioned", function(){
        todo.remove
    })
    */
}

function filterTodo(e) {
    const todos = toDoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('complete')) {
                    todo.style = 'flex';
                } else {
                    todo.style = "none";
                }
                break;
            case "unfinished":
                if (!todo.classList.contains('completed')) {
                    todo.style = 'flex';
                } else {
                    todo.style = "none";
                }
                break;
        }
    });
}

function saveToLocal(todo) {
    //Check to see if there is an array already if not create one. 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getLocal() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //todo Div
        const listDiv = document.createElement("div");
        listDiv.id = "todo";
        //todo LI
        listDiv.classList.add("todo");
        const newItem = document.createElement('li');
        newItem.innerText = todo;
        newItem.classList.add("listItem");
        listDiv.appendChild(newItem);
        //Completed task
        const completedButton = document.createElement("button");
        completedButton.innerText = "!";
        completedButton.classList.add("completed");
        listDiv.appendChild(completedButton);
        //Delete todo
        const trashButton = document.createElement('button');
        trashButton.classList.add("delete");
        trashButton.innerText = "x";
        listDiv.appendChild(trashButton);
        //add to my todolist
        toDoList.appendChild(listDiv);
    })
}
function removeLocalItems(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// var oList = document.createElement('li');
// var oListValue = inputField.value;
// var oListItem = document.createTextNode(oListValue);
// oList.appendChild(oListItem);
// if (oListValue === '' || oListValue === null) {
//     alert("You must know one thing you need to do!");
// } else {
//     document.getElementById('startList').appendChild(oList);
//     theList.push(oListValue);
// }
// inputField.value = '';
// oList.addEventListener('click', function () {
//     oList.style.textDecoration = "line-through";
// })
// oList.addEventListener('dblclick', function () {
//     oList.style.textDecoration = "none";
// })