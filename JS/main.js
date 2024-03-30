const books_container = document.getElementById("b-container");
const add_button = document.getElementById("add-btn");
const addDialog = document.querySelector(".add-dialog");
const submit_add_dialog = document.getElementById("close-add-dialog");
const exit_add_dialog = document.getElementById("exit-add-dialog");
const editDialog = document.querySelector(".edit-dialog");
const submit_edit_dialog = document.getElementById("close-edit-dialog");
const exit_edit_dialog = document.getElementById("exit-edit-dialog");
const search_bar = document.querySelector(".book-filter-bar");
const book_filter = document.getElementById("book-filter");

let books_data_base = [];

document.addEventListener("DOMContentLoaded", () => {
  books_data_base = localStorage.getItem("books-db") ? JSON.parse(localStorage.getItem("books-db")) : [
    new Book("To Kill a Mockingbird", "Harper Lee", 1960, 336, "In Progress"),
    new Book("1984", "George Orwell", 1949, 328, "In Progress", 2),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, 180, "Completed")
  ];

  displayBookCards();

  add_button.addEventListener("click", () => addDialog.showModal())
  submit_add_dialog.addEventListener("click", () => handleAddDialogClose())
  exit_add_dialog.addEventListener("click", () => addDialog.close())

  submit_edit_dialog.addEventListener("click", () => handleEditDialogClose())
  exit_edit_dialog.addEventListener("click", () => editDialog.close())

  book_filter.addEventListener("click", () => filterBook());
  search_bar.addEventListener("keydown", (e) => {
    if (e.key == "Enter") { filterBook() }
  })
})

function Book (title, author, release_date, pages, status) {
  this.title = title;
  this.author = author;
  this.release_date = release_date;
  this.pages = pages;
  this.status = status;
  this.code = generateUniqueCode();
}

function generateUniqueCode() {
  let exist = false;
  while (!exist) {
    const newCode = Math.floor(Math.random() * 999) + 1;
    books_data_base.forEach((book) => {
      if (book.code == newCode) { exist = true }
    })

    if (!exist) { return newCode }
  }
}

function generateBookCard(book) {
  const status_style = getBookStatusStyling(book.status);
  const bookCard = `
    <div class="book-card ${status_style}">
      <article class="b-title">${book.title}</article>
      <article class="b-author">By ${book.author}</article>
      <article>${book.release_date}</article>
      <article class="b-pages">${book.pages} pag.</article>
      <article class="b-status status-${status_style}">${book.status}</article>
      <div class="b-actions">
        <button type="button" title="edit" class="edit-btn" data-code="${book.code}"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" title="remove" class="remove-btn" data-code="${book.code}"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `
  return bookCard;
}

function getBookStatusStyling (status) {
  let status_styling;
  if (status.toLowerCase() == "completed") {
     status_styling = "c";
  } else if (status.toLowerCase() == "in progress") {
    status_styling = "ip"
  } else {
    status_styling = "oh"
  }
  return status_styling;
}

function displayBookCards () {
  localStorage.setItem("books-db", JSON.stringify(books_data_base));
  books_container.innerHTML = "";

  books_data_base.forEach(book => {
    books_container.innerHTML += generateBookCard(book);
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => displayEditDialog(button.getAttribute("data-code")));
  })

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => removeBook(button.getAttribute("data-code")));
  })
}

function handleAddDialogClose() {
  if (checkFormValidity(".add-book-form")) {
    addDialog.close();
    addBook();
  } else {
    alert("Please fill all the requires fields.")
  }
}

function handleEditDialogClose() {
  if (checkFormValidity(".edit-book-form")) {
    editDialog.close();
    editBook(submit_edit_dialog.getAttribute("data-code"));
  } else {
    alert("Please fill all the requires fields.")
  }
}

function checkFormValidity(formClass) {
  const form = document.querySelector(formClass);
  return form.checkValidity();
}

function displayEditDialog(book_code) {
  books_data_base.forEach(book => {
    if (book.code == book_code) {
      document.getElementById("edit-title").value = book.title;
      document.getElementById("edit-author").value = book.author;
      document.getElementById("edit-release-date").value = book.release_date;
      document.getElementById("edit-pages").value = book.pages;
      document.getElementById("edit-status").value = book.status;
    }
  });

  submit_edit_dialog.setAttribute("data-code", book_code)
  editDialog.showModal();
}

function addBook () {
  const title = document.getElementById("add-title").value;
  const author = document.getElementById("add-author").value;
  const release_date = document.getElementById("add-release-date").value;
  const pages = document.getElementById("add-pages").value;
  const status = document.getElementById("add-status").value;

  const newBook = new Book(title, author, release_date, pages, status);

  books_data_base.push(newBook);

  document.getElementById("add-title").value = "";
  document.getElementById("add-author").value = "";
  document.getElementById("add-release-date").value = "";
  document.getElementById("add-pages").value = "";
  document.getElementById("add-status").value = "";

  displayBookCards();
}

function editBook(edit_code) {
  books_data_base.forEach(book => {
    if (book.code == edit_code) {
      console.log("Editing...")
      book.title = document.getElementById("edit-title").value;
      book.author = document.getElementById("edit-author").value;
      book.release_date = document.getElementById("edit-release-date").value;
      book.pages = document.getElementById("edit-pages").value;
      book.status = document.getElementById("edit-status").value;

      document.getElementById("edit-title").value = "";
      document.getElementById("edit-author").value = "";
      document.getElementById("edit-release-date").value = "";
      document.getElementById("edit-pages").value = "";
      document.getElementById("edit-status").value = "";

      displayBookCards();
    }
  });
}

function removeBook(book_code) {
  for (const i in books_data_base) {
    if (books_data_base[i].code == book_code) {
      books_data_base.splice(i, 1);
    }
  }

  displayBookCards();
}

function filterBook() {
  books_data_base.forEach(book => {
    const book_title = book.title.substring(0, search_bar.value.length);
    if (book_title.toLowerCase() == search_bar.value.toLowerCase()) {
      books_container.innerHTML = "";
      books_container.innerHTML += generateBookCard(book);
      
      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => displayEditDialog(button.getAttribute("data-code")));
      })

      document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", () => removeBook(button.getAttribute("data-code")));
      })

      search_bar.value = "";
    } else {
      books_container.innerHTML = `<article>Book(s) not found...</article>`
    }
  });
}