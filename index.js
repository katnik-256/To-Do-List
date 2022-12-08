// Array to store the to do items
let item = [];

//function to add a todo object an then push it in the array item

function addTodo(text){
    const toDo = {
        text,
        checked: false,
        id: Date.now(),
    };
    item.push(toDo);
    renderTodo(toDo); 
}
//selecting the form element
const form =document.querySelector('.list');
//add a submit event listener
form.addEventListener('submit',  event => {
    //prevent page refresh on form submission
    event.preventDefault();
    //select the text input
    const input = document.querySelector('.itemName');
    // get the value of input and remove white space.
    const text = input.value.trim();
    if(text!== ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }

});

//rendering the todo list

// function renderTodo(toDo){
//     //select the first element in the list
//     const list = document.querySelector('.js-todo-list');

// //ternary operator
// const ischecked = toDo.checked? 'done': '';
// //creat a `li` ans assign it to node
// const node = document.createElement('li');
// //set the attribute
// node.setAttribute('class', `todo-item ${ischecked}`);

// node.setAttribute(`data-key`, toDo.id);

// // Set the contents of the `li` element created above
// node.innerHTML = `
// <input id="${toDo.id}" type="checkbox"/>
// <label for="${toDo.id}" class="tick js-tick"></label>
// <span>${toDo.text}</span>
// <button class="delete-toDo js-delete-toDo">
// <svg><use href="#delete-icon"></use></svg>
// </button>
// `;list.append(node);
// }


function renderTodo(toDo) {
    const list = document.querySelector('.js-todo-list');
    // select the current todo item in the DOM
    const item = document.querySelector(`[data-key='${toDo.id}']`);

    if(toDo.deleted){
        item.remove();
        return

    }
  
    const isChecked = toDo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `toDo-item ${isChecked}`);
    node.setAttribute('data-key', toDo.id);
    node.innerHTML = `
      <input id="${toDo.id}" type="checkbox"/>
      <label for="${toDo.id}" class="tick js-tick"></label>
      <span>${toDo.text}</span>
      <button class="delete-toDo js-delete-toDo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;
  
    // If the item already exists in the DOM
    if (item) {
      // replace it
      list.replaceChild(node, item);
    } else {
      // otherwise append it to the end of the list
      list.append(node);
    }
  }


//selsects the entire list
const list = document.querySelector('js-todo-list');
//add the event listener on click
list.addEventListener('click', event =>{
    if(event.target.classList.contains('js-stick')){
        const itemkey = event.target.parentElement.dataset.key;
        toggleDone(itemkey);

    }
    if(event.target.classList.contains('js-delete-toDo')){
        const itemkey = event.target.parentElement.dataset.key;
        deleteTodo(itemkey);
    }

})
function toggleDone(key){
    const index = item.findIndex(item => item.id === Number(key));

    item[index].checked = item[index].checked;
    renderTodo(item[index]);
}

//delete todo function

function deleteTod(){
    // find the corresponding todo object in the todoItems array
    const index = item.findIndex(item => item.id === Number(key));
    //creat a new object with equivalent properties

    const toDo = {
        delete: true,
        ...item[index]
    };
    item = item,filter(item => item.id !==Number(key));
    renderTodo(toDo);
};
localStorage.setItem('itemRef', JSON.stringify(item));

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });





