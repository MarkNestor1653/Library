
class Book {
    constructor(title, author, pages, isRead) {  //constructor for making new book objects
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title = title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const library = new Library();
const submitFormButton = document.getElementById('SubmitFormBtn');
const formElem = document.querySelector('form');


formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
    console.log('formdata fired');
    addNewBook(e.formData);
    // Get the form data from the event object

});

function addNewBook(formData) {

    // if (checkDuplicate(formData.get('title')) === 1) {
    //     console.log('exists')
    //     return alert('This book already exists in your library')
    // }
    //************************************************************************************************************* */
    if (library.isInLibrary(formData.get('title'))) {//isInLibrary
        alert('book already in library')
        return
    }
    let isRead;

    if (formData.get('readStatus') === 'on') {
        isRead = true;
    } else {
        !isRead;
    }

    let newBook = new Book(
        formData.get('title'),
        formData.get('author'),
        formData.get('pages'),
        isRead
    );
    //add book object to library array
    library.addBook(newBook);
    closeForm();
    loopArray();
}

//create a data attribute corresponding to objects index position in array
//used to locate book for removal
function assignID(title) {
    const index = library.books.findIndex(book => book.title == title);
    return index;
}

//clears and sets the library grid
function loopArray() {
    clearGrid();
    library.books.forEach(book => {
        let identity = assignID(book.title);
        addBookCard(book.title, book.author, book.pages, book.isRead, identity)
    })
}

//function that checks for book titles, preventing duplicate books in library.
// function checkDuplicate(newTitle) {
//     let found = myLibrary.find(book => book.title === newTitle);
//     if (found === undefined) {
//         return
//     }
//     if (newTitle === found.title) {
//         return 1;
//     }
// }

//creates elements for book cards and adds the text
function addBookCard(title, author, pages, isRead, identity) {

    const bookCard = document.createElement("div");
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const btnContainer = document.createElement('div');
    const removeBtn = document.createElement('button');
    const bookReadStatus = document.createElement('button');


    document.getElementById('libraryGrid').appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(btnContainer);
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(bookReadStatus);

    bookCard.setAttribute('data-id', identity);

    bookTitle.textContent = title;//'Title: ' +
    bookAuthor.textContent = author;//'Author: ' +
    bookPages.textContent = 'Pages: ' + pages;
    bookReadStatus.innerHTML = isRead;
    removeBtn.innerHTML = 'Remove';

    bookCard.classList.add('book-card');
    btnContainer.classList.add('btn-container');
    removeBtn.classList.add('removeBtn');
    bookReadStatus.classList.add('bookReadStatus');

    removeBtn.onclick = removeBook;
    bookReadStatus.onclick = changeStatus;

    if (isRead) {
        bookReadStatus.textContent = 'Read'
        bookReadStatus.classList.add('read')
    } else {
        bookReadStatus.textContent = 'Not read'
        bookReadStatus.classList.add('unread')
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//************************************************************************************************************* */
const removeBook = (e) => {
    //get data attribute
    //const index = e.target.parentNode.parentNode.getAttribute('data-id');
    //console.log(index);
    //look for object with corresponding index
    //console.log(myLibrary.splice(index, 1));
    console.log(e.target.parentNode.parentNode.firstChild.innerHTML)
    const title = e.target.parentNode.parentNode.firstChild.innerHTML//.replaceAll(
    //    '"',
    //    ''
    //)
    library.removeBook(title);
    loopArray();
}

const changeStatus = (e) => {
    //changes readStatus to off
    const index = e.target.parentNode.parentNode.getAttribute('data-id');
    library.books[index].isRead = !library.books[index].isRead;
    loopArray();
}


function clearGrid() {
    document.getElementById('libraryGrid').innerHTML = '';
}