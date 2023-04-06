import { addListItems, renderingListItems } from './src/modules/add-remove-Items.js';

describe('Adding Items and Removing Testing', () => {
  document.body.innerHTML = `
  <input id='toDoItemsInput'>
  <button id='addinBtn'></button>
  <div id='containerItems'></div>
  `;

  test('Items To The list', () => {
    addListItems('Football', false, 0);
    const localListItems = JSON.parse(localStorage.getItem('listStorage'));
    expect(localListItems.length).toBe(1);
  });
  test('Remove item from the list', () => {
    addListItems('work', false, 1);
    const localListItems = JSON.parse(localStorage.getItem('listStorage'));
    expect(localListItems.length).toBe(2);
    localListItems.pop();
    localStorage.setItem('listStorage', JSON.stringify(localListItems));
    renderingListItems();
    const itemsToDo = document.getElementById('containerItems');
    expect(itemsToDo.childElementCount).toBe(1);
  });
});

describe('Testing  update if it is functional', () => {
  document.body.innerHTML = `
    <input id='toDoItemsInput'>
    <button id='addinBtn'></button>
    <div id='containerItems'></div>
    `;

  test('Can all completed updated Items bet true', () => {
    const localListItems = JSON.parse(localStorage.getItem('listStorage'));
    localListItems[0].completed = true;
    localStorage.setItem('listStorage', JSON.stringify(localListItems));
    renderingListItems();
    const itemsToDo = document.getElementById('containerItems');
    expect(itemsToDo.children[0].children[0].checked).toBe(true);
  });

  test('Can all completed updated Items bet false', () => {
    const localListItems = JSON.parse(localStorage.getItem('listStorage'));
    localListItems[0].completed = false;
    localStorage.setItem('listStorage', JSON.stringify(localListItems));
    renderingListItems();
    const itemsToDo = document.getElementById('containerItems');
    expect(itemsToDo.children[0].children[0].checked).toBe(false);
  });
  test('Can  remove all completed be true', () => {
    const localListItems = JSON.parse(localStorage.getItem('listStorage'));
    localListItems.pop();
    const newDataEntering = {
      description: 'video-game',
      completed: true,
      index: 0,
    };
    const newData2 = { description: 'activities', completed: true, index: 1 };
    localListItems.push(newDataEntering);
    localListItems.push(newData2);
    const Completed = jest.fn(() => localListItems.filter((item) => item.completed === true));
    const completedItem = Completed();
    expect(completedItem).toHaveLength(2);
  });
});
