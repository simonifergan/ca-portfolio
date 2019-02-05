var gBooks;
const BOOKS_KEY = 'books';

function createBooks() {
    let books = getItemFromLocalStorage(BOOKS_KEY);
    if (!books) {
        books = [
            createBook('Hunger Games', 'Suzanne Collins'),
            createBook('Harry Potter', 'J.K. Rowling'),
            createBook('The Dark Tower', 'Stephen King'),
            createBook('Becoming', 'Michelle Obama'),
        ];
    }
    gBooks = books;
}

function createBook(name, author, price = (getRandomIntInclusive(20, 99) + 0.99)) {
    let id = generateId();
    while (gBooks && gBooks.find(book => book.id === id)) { id = generateId(); }
    return {
        id: id,
        name: name,
        author: author,
        qty: getRandomIntInclusive(1,10),
        price: price,
        rating: 0,
        coverSrc: getBookCoverSrc(name),
    }
}

function deleteBook(bookId) {
    let bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIdx, 1);
    // save books to storage
    setItemInLocalStorage(BOOKS_KEY, gBooks);

}

function addBook(bookName, bookAuthor, bookPrice) {
    // add book to gBooks
    let book = createBook(bookName, bookAuthor, bookPrice);
    gBooks.push(book);
    // save books to storage
    setItemInLocalStorage(BOOKS_KEY, gBooks);
}

function updateBookPrice(bookId, newPrice) {
    let book = getBookById(bookId);
    book.price = +newPrice;
    // save books to storage
    setItemInLocalStorage(BOOKS_KEY, gBooks);
}

function getBooks() {
    return gBooks.slice();
}

function getBooksToDisplay(property = 'name', direction = true) {
    let books = getBooks();
    books.sort((book1, book2) => {
        if (direction) {
            if (typeof book1[property] === 'string') return book1[property].localeCompare(book2[property]);
            else if (typeof book1[property] === 'number') return book1[property] - book2[property];
        } else {
            if (typeof book1[property] === 'string') return book2[property].localeCompare(book1[property]);
            else if (typeof book1[property] === 'number') return book2[property] - book1[property];
        }
    })
    return books;
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function getBookCoverSrc(name) {
    return name.toLowerCase().replace(/ /g, '-') + '.png';
}

function updateBookRating(diff, bookId) {
    let book = getBookById(bookId);
    let newRating = book.rating + diff
    if (newRating >= 0 && newRating <= 9) book.rating = newRating;
    else return;
    // save books to storage
    setItemInLocalStorage(BOOKS_KEY, gBooks);
}