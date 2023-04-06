import './styles.css';
import { addListItems, renderingListItems } from './modules/add-remove-Items.js';
import completedAllListItems from './modules/list-Items-Interraction.js';

const addListButton = document.querySelector('.addbutton_El');
const todoListItemsInput = document.querySelector('.todoListItemsInput ');
const clearAllListItems = document.querySelector('.completedAllListItems');

window.addEventListener('load', () => {
  renderingListItems();
});

addListButton.addEventListener('click', () => {
  addListItems(todoListItemsInput.value, false, JSON.parse(localStorage.getItem('listStorage')).length + 1);
  renderingListItems();
});

clearAllListItems.addEventListener('click', () => {
  completedAllListItems();
  renderingListItems();
});
