const addBtn = document.getElementById("add-btn");
const addDialog = document.querySelector(".add-dialog");
const closeAddDialog = document.getElementById("close-add-dialog");
const exitAddDialog = document.getElementById("exit-add-dialog");
const editDialog = document.querySelector(".edit-dialog");
const closeEditDialog = document.getElementById("close-edit-dialog");
const exitEditDialog = document.getElementById("exit-edit-dialog");
const booksContainer = document.getElementById("b-container");
let bookEditIndex;
let booksCode = [1, 2, 3]
let booksDB = [
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "release-date": 1960,
    "pages": 336,
    "status": "In Progress",
    "code" : 1
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "release-date": 1949,
    "pages": 328,
    "status": "In Progress",
    "code" : 2
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "release-date": 1925,
    "pages": 180,
    "status": "Complete",
    "code" : 3
  }
];

document.addEventListener("DOMContentLoaded", () => {
  displayBookCards();

  addBtn.addEventListener("click", () => addDialog.showModal())

  closeAddDialog.addEventListener("click", () => {
    if (checkFormValidity(".add-book-form")) {
      addDialog.close();
      addBook();
    } else {
      alert("Please fill all the requires fields.")
    }
  })

  exitAddDialog.addEventListener("click", () => addDialog.close())

  closeEditDialog.addEventListener("click", () => {
    if (checkFormValidity(".edit-book-form")) {
      editDialog.close();
      editBook();
    } else {
      alert("Please fill all the requires fields.")
    }
  })

  exitEditDialog.addEventListener("click", () => editDialog.close())
})

function displayBookCards () {
  booksContainer.innerHTML = "";

  for (const book in booksDB) {
    let statusStyles;
    if (booksDB[book]["status"].toLowerCase() == "completed") {
      statusStyles = "c";
    } else if (booksDB[book]["status"].toLowerCase() == "in progress") {
      statusStyles = "ip"
    } else {
      statusStyles = "oh"
    }

    booksContainer.innerHTML += `
      <div class="book-card ${statusStyles}">
        <article class="b-title">${booksDB[book]["title"]}</article>
        <article class="b-author">By ${booksDB[book]["author"]}</article>
        <article>${booksDB[book]["release-date"]}</article>
        <article class="b-pages">${booksDB[book]["pages"]} pag.</article>
        <article class="b-status status-${statusStyles}">${booksDB[book]["status"]}</article>
        <div class="b-actions">
          <button type="button" title="edit" class="edit-btn" onClick="bookEditIndex = ${booksDB[book]["code"]}; fillEditForm(bookEditIndex);"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" title="remove" class="remove-btn" onClick="removeBook(${booksDB[book]["code"]})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `
  }
}

function addBook () {
  newBook = {
    "title": document.getElementById("add-title").value,
    "author" : document.getElementById("add-author").value,
    "release-date" : document.getElementById("add-release-date").value,
    "pages" : document.getElementById("add-pages").value,
    "status" : document.getElementById("add-status").value,
    "code" : booksCode[booksCode.length - 1] + 1
  };

  document.getElementById("add-title").value = "";
  document.getElementById("add-author").value = "";
  document.getElementById("add-release-date").value = "";
  document.getElementById("add-pages").value = "";
  document.getElementById("add-status").value = "";

  booksDB.push(newBook)
  booksCode.push(newBook["code"])
  displayBookCards();
}

function fillEditForm(code) {
  console.log("Filling")
  for (const i in booksDB) {
    if (booksDB[i]["code"] == code) {
      document.getElementById("edit-title").value = booksDB[i]["title"];
      document.getElementById("edit-author").value = booksDB[i]["author"];
      document.getElementById("edit-release-date").value = booksDB[i]["release-date"];
      document.getElementById("edit-pages").value = booksDB[i]["pages"];
      document.getElementById("edit-status").value = booksDB[i]["status"];
    } 
  }

  editDialog.showModal();
}

function editBook() {
  for (const i in booksDB) {
    if (booksDB[i]["code"] == bookEditIndex) {
      booksDB[i]["title"] = document.getElementById("edit-title").value;
      booksDB[i]["author"] = document.getElementById("edit-author").value;
      booksDB[i]["release-date"] = document.getElementById("edit-release-date").value;
      booksDB[i]["pages"] = document.getElementById("edit-pages").value;
      booksDB[i]["status"] = document.getElementById("edit-status").value;

      document.getElementById("edit-title").value = "";
      document.getElementById("edit-author").value = "";
      document.getElementById("edit-release-date").value = "";
      document.getElementById("edit-pages").value = "";
      document.getElementById("edit-status").value = "";

      displayBookCards();
    } 
  }
}

function removeBook(code) {
  for (const i in booksDB) {
    if (booksDB[i]["code"] == code) {
      booksDB.splice(i, 1);
    }
  }

  for (const i in booksCode) {
    if (booksCode[i] == code) {
      booksCode.splice(i, 1);
    }
  }

  displayBookCards();
}

function checkFormValidity(formClass) {
  const form = document.querySelector(formClass);
  return form.checkValidity();
}