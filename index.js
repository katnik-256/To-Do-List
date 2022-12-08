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

}
);
//rendering the todo list

function renderTodo(toDo){
    //select the first element in the list
    const list = document.querySelector('.js-todo-list');

//ternary operator
const ischecked = toDo.checked? 'done': '';
//creat a `li` ans assign it to node
const node = document.createElement('li');
//set the attribute
node.setAttribute('class', `todo-item ${ischecked}`);

node.setAttribute(`data-key`, toDo.id);

// Set the contents of the `li` element created above
node.innerHTML = `
<input id="${toDo.id}" type="checkbox"/>
<label for="${toDo.id}" class="tick js-tick"></label>
<span>${toDo.text}</span>
<button class="delete-toDo js-delete-toDo">
<svg><use href="#delete-icon"></use></svg>
</button>
`;list.append(node);

}
//selsects the entire list
const list = document.querySelector('js-todo-list');
//add the event listener on click
list.addEventListener('click', event =>{
    if(event.target.classList.contains('js-stick')){
        const itemkey = event.target.parentElement.dataset.key;
        toggleDone(itemkey);

    }
})
function toggleDone(key){
    const index = item.findIndex(item => item.id === Number(key));

    item[index].checked = item[index].checked;
    renderTodo(item[index]);
}
