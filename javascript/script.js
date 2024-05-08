let books = [];

// Memuat data dari localStorage
function loadBooks() {
  const storedBooks = localStorage.getItem("books");

  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }

  displayBooks();
}

// Menampilkan daftar buku
function displayBooks(filteredBooks = books) {
  const unreadBooksList = document.getElementById("unreadBooksList");
  const readBooksList = document.getElementById("readBooksList");

  unreadBooksList.innerHTML = "";
  readBooksList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const listElement = book.isComplete ? readBooksList : unreadBooksList;
    const listItem = document.createElement("li");
    listItem.classList.add("book");

    const infoElement = document.createElement("div");
    infoElement.classList.add("book-info");

    const titleElement = document.createElement("span");
    titleElement.classList.add("book-title");
    titleElement.textContent = book.title + "  |  ";

    const authorElement = document.createElement("span");
    authorElement.classList.add("book-author");
    authorElement.textContent = `Penulis: ${book.author} | `;

    const yearElement = document.createElement("span");
    yearElement.classList.add("book-year");
    yearElement.textContent = `Tahun: ${book.year}`;

    infoElement.appendChild(titleElement);
    infoElement.appendChild(authorElement);
    infoElement.appendChild(yearElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("book-actions");

    const moveButton = document.createElement("button");
    moveButton.classList.add("button");
    moveButton.textContent = book.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca";
    moveButton.addEventListener("click", () => moveBook(book.id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    actionsElement.appendChild(moveButton);
    actionsElement.appendChild(deleteButton);

    listItem.appendChild(infoElement);
    listItem.appendChild(actionsElement);
    listElement.appendChild(listItem);
  });
}

// Menambahkan buku baru
function addBook(title, author, year) {
  const newBook = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete: false,
  };

  books.push(newBook);
  saveBooks();
  displayBooks();
}

// Memindahkan buku antar rak
function moveBook(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveBooks();
    displayBooks();
  }
}

// Menghapus buku
function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  saveBooks();
  displayBooks();
}

// Menyimpan data buku ke localStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Inisialisasi: memuat data dan menyiapkan event listener
loadBooks();

// Event listener untuk form submission
const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const year = document.getElementById("bookYear").value;
  addBook(title, author, year);
});

// Implementasi pencarian buku
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
  });
  displayBooks(filteredBooks);
});
