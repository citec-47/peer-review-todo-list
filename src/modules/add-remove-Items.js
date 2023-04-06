/* eslint no-undefined: "error" */

const todoListItemsInput = document.querySelector('.todoListItemsInput');

class MainClassContainer {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.itemsArray = JSON.parse(localStorage.getItem('listStorage')) || [];
  }
}

const taskitems = new MainClassContainer();

const renderingListItems = () => {
  const inFormation = JSON.parse(localStorage.getItem('listStorage')) || [];
  const containerlistEl = document.getElementById('containerItems');
  containerlistEl.innerHTML = '';
  inFormation.forEach((element, id) => {
    containerlistEl.innerHTML
    += `
    <div class='doListItems'>
    <input class='itemClass' id='checkId-${id}', "completed"' type='checkbox' ${element.completed ? 'checked' : ''} onclick='checkListItemsUpdate(${id}, "completed")'>
    <input type='text' class='findInput' id='input-${id}' value=${element.description} />
    <i onclick='checkListItemsUpdate(${id}, "description")' class='fa-solid fa-file-pen' id='options-${id}'></i>
    <i onclick='deleteItem(${id})' class='fa-solid fa-trash del-btn' id='delete-${id}'></i>
  </div>
    `;
  });
  return inFormation.length;
};

const addListItems = (description, completed, index) => {
  const arrOfList = new MainClassContainer(description, completed, index);
  taskitems.itemsArray.push(arrOfList);
  localStorage.setItem('listStorage', JSON.stringify(taskitems.itemsArray));
  setTimeout(() => {
    todoListItemsInput.value = '';
  }, 500);
  renderingListItems();
};

window.removeItems = () => {
  const deleteBtn = [...document.querySelectorAll('.fa-trash')];
  deleteBtn.forEach((item) => {
    item.addEventListener('click', () => {
      taskitems.itemsArray.splice(deleteBtn.indexOf(item), 1);
      taskitems.itemsArray.forEach((item, index) => {
        item.index = index + 1;
      });
      localStorage.setItem('listStorage', JSON.stringify(taskitems.itemsArray));
      renderingListItems();
    });
  });
};

const checkListItemsUpdate = (updateListInput, updateCheckbox, id) => {
  updateListInput = document.querySelector(`#input-${id}`).value;
  updateCheckbox = document.querySelector(`#check-${id}`).checked;
  const mainArray = taskitems.itemsArray.map((itemEl) => {
    if (itemEl.index - 1 === id) {
      itemEl.description = updateListInput;
    }
    if (itemEl.index - 1 === id) {
      itemEl.completed = updateCheckbox;
    }

    return itemEl;
  });

  localStorage.setItem('listStorage', JSON.stringify(mainArray));
};

export { addListItems, renderingListItems, checkListItemsUpdate };
