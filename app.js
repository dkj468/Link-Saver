const linkSubmit = document.getElementById('linkSubmit');
const addBtn = document.getElementById('addBtn');
const linkCancel = document.getElementById('linkCancel');
const addLinkPanel = document.getElementById('addLink');
const linkList = document.querySelector('.linkList');
const linkCategories = document.getElementById('categories');
const addLinkContainer = document.getElementById('addLinkContainer');

// input data
const linkTitle = document.getElementById('linkTitle');
const linkURL = document.getElementById('linkURL');
const linkCategory = document.getElementById('linkCategory');

let categories = [];
let links = [];
editIndex = -1;
linkID = -1;

// utility methods

function displayLinkCategories() {
  let categoriesHTML = '';
  for (let category of categories) {
    categoriesHTML += `<span class="category">${category}</span>`;
  }
  linkCategories.innerHTML = categoriesHTML;
}

function deleteLink(index) {
  const panel = document.querySelectorAll(`[data-id="${index}"]`)[0];
  linkList.removeChild(panel);
  links.forEach((link, elIndex) => {
    if (link.id === index) {
      links.splice(elIndex, 1);
    }
  });
}

function editLink(index) {
  editIndex = index;
  links.forEach((link) => {
    if (link.id === index) {
      linkTitle.value = link.title;
      linkURL.value = link.url;
      categories = link.categories;

      showAddLinkForm();
      displayLinkCategories();
    }
  });
}

function showAddLinkForm() {
  addLinkContainer.classList.remove('hidden');
}

function hideAddLinkForm() {
  addLinkContainer.classList.add('hidden');
}

function clearAddLinkForm() {
  linkTitle.value = '';
  linkURL.value = '';
  linkCategory.value = '';
  categories = [];
  displayLinkCategories();
}

linkCategory.addEventListener('keydown', (event) => {
  if (event.keyCode === 188) {
    event.preventDefault();
    categories.push(linkCategory.value);
    linkCategory.value = '';
    //display the link categories
    displayLinkCategories();
  }
});

linkSubmit.addEventListener('click', (event) => {
  event.preventDefault(); // stop form to submit

  //get values from form
  const title = linkTitle.value;
  const url = linkURL.value;

  const newLink = {
    title,
    url,
    categories,
  };

  if (editIndex === -1) {
    links.unshift(newLink);
    linkID++;
    newLink.id = linkID;
    addNewLink(newLink);
  } else {
    updateLink(newLink, editIndex);
  }

  // clear the form after submit
  clearAddLinkForm();
  // hide the add link panel
  hideAddLinkForm();
  // Show added links to UI
  //displayLinks();
});

function addNewLink(link) {
  let linksHtml = '';
  let panel = document.createElement('div');
  panel.classList.add('flex-item');
  panel.dataset.id = link.id;
  linksHtml += `
  <div class="link panel">
  <div class="link-action">
    <button class="btn-sm" id="linkDelete" onClick= "deleteLink(${
      link.id
    })">Delete</button>
    <button class="btn-sm" id="linkEdit" onClick= "editLink(${
      link.id
    })">Edit</button>
  </div>

  <a href="${link.url}" target="_blank"> <h1 class="header">${
    link.title
  }</h1></a>
  <p class="link-date">${new Date().toLocaleDateString()}</p>
  <div class="categories">`;
  for (let category of link.categories) {
    linksHtml += `<span class="category">${category}</span>`;
  }

  linksHtml += `</div></div>`;
  panel.innerHTML = linksHtml;

  linkList.prepend(panel);
}

function updateLink(link, index) {
  const panel = document.querySelectorAll(`[data-id="${index}"]`)[0];
  let linksHtml = '';
  linksHtml += `
  <div class="link-action">
    <button class="btn-sm" id="linkDelete" onClick= "deleteLink(${
      link.id
    })">Delete</button>
    <button class="btn-sm" id="linkEdit" onClick= "editLink(${
      link.id
    })">Edit</button>
  </div>

  <a href="#"> <h1 class="header">${link.title}</h1></a>
  <p class="link-date">${new Date().toLocaleDateString()}</p>
  <div class="categories">`;
  for (let category of link.categories) {
    linksHtml += `<span class="category">${category}</span>`;
  }

  linksHtml += `</div>`;
  panel.innerHTML = linksHtml;
}

addBtn.addEventListener('click', (event) => {
  showAddLinkForm();
});

linkCancel.addEventListener('click', (event) => {
  event.preventDefault();
  clearAddLinkForm();
  hideAddLinkForm();
});
