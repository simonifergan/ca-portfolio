const BOOKS_PER_PAGE = 5;

var gCurrSortDirection;
var gLastSortProperty;
var gBooksToDisplay;
var gCurrPageIdx;

function init() {
    gCurrSortDirection = true;
    gLastSortProperty = null;
    gBooksToDisplay = null;
    gCurrPageIdx = 0;
    createBooks();
    renderBooks();
}

function renderBooks() {
    let books = gBooksToDisplay;
    if (!books) books = getBooksToDisplay();
    let maxBooksToDisplay = gCurrPageIdx * BOOKS_PER_PAGE + BOOKS_PER_PAGE;
    books = books.slice(gCurrPageIdx * BOOKS_PER_PAGE, maxBooksToDisplay);

    let strHtmls = books.map((book, idx) => {
        
        let rating = '';
        for (let i = 0; i < book.rating; i++) { rating += '★'; }
        if (!rating) rating = '--';

        let rowStyle;
        if (idx % 2 === 0) rowStyle = 'row-light';
        else rowStyle = 'row-dark';

        let currency = (getCurrLang() === 'en') ? '$' : '₪';

        return `<tr class="tr-book id-${book.id} ${rowStyle}">
                    <td class="link book-name" onclick="renderViewBookModal('${book.id}')">${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.qty}</td>
                    <td>${currency}${getPriceByCurrency(book.price)}</td>
                    <td style="color:#e7c549; font-size: 18px; text-shadow: 1px 1px 0 #000;">${rating}</td>
                    <td class="book-actions">
                        <button data-trans="btn-modify-book" class="btn btn-modify" onclick="renderModifyBookModal('${book.id}')">
                            Modify
                        </button>
                        <button class="btn btn-delete" onclick="onDeleteBook('${book.id}')">
                            &times;
                        </button>
                    </td>
                </tr>`
    });
    document.querySelector('.table-books-body').innerHTML = strHtmls.join('');
    renderBookPagesNav();
    renderTranslation(getCurrLang());
}

function renderBookPagesNav() {
    let books = getBooksToDisplay();
    let maxPages = books.length / BOOKS_PER_PAGE;
    let strHtml = ''
    for (let i = 0; i < maxPages; i++) {
        strHtml += `<button class="btn btn-page" onclick="onChangePage(${i})">${i + 1}</button>`
    }
    document.querySelector('.pages-nav-container').innerHTML = strHtml;
}

function renderTranslation(lang) {
    setCurrLang(lang);
    if (lang === 'he') document.body.style.direction = 'rtl';
    else document.body.style.direction = 'ltr';
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        let key = el.dataset.trans;
        el.innerText = getTranslation(key);
    });
}

function onChangePage(pageNum) {
    gCurrPageIdx = pageNum;
    renderBooks();
}

function onAddBook(ev) {
    ev.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookPrice = +document.getElementById('bookPrice').value;
    if (!bookPrice || typeof bookPrice !== 'number' || !bookName || !bookAuthor) {
        document.querySelector('.wrong-input.form').style.display = 'flex';
        setTimeout(function () { document.querySelector('.wrong-input.form').style.display = 'none';}, 3000);
        return;
    }
    addBook(bookName, bookAuthor, bookPrice);
    gBooksToDisplay = getBooksToDisplay(gLastSortProperty, gCurrSortDirection);
    onCloseModal(ev);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    gBooksToDisplay = getBooksToDisplay(gLastSortProperty, gCurrSortDirection);
    renderBooks();
}

function onSortBy(property) {
    if (!gLastSortProperty) gLastSortProperty = property;
    if (gLastSortProperty === property) {
        gCurrSortDirection = !gCurrSortDirection;
    } else {
        gLastSortProperty = property;
        gCurrSortDirection = true;
    }
    let books = getBooksToDisplay(property, gCurrSortDirection);
    gBooksToDisplay = books;
    renderBooks();
}

function onUpdateBookPrice(ev, bookId) {
    let newPrice = +document.getElementById('newBookPrice').value;
    if (isNaN(newPrice)) {
        document.querySelector('.wrong-input.modify').style.display = 'flex';
        setTimeout(function () { document.querySelector('.wrong-input.modify').style.display = 'none';}, 3000);
        return;
    }
    updateBookPrice(bookId, newPrice)
    gBooksToDisplay = getBooksToDisplay(gLastSortProperty, gCurrSortDirection);
    onCloseModal(ev);
    renderBooks();
}

function onBookRatingChange(diff, bookId) {
    // diff true - increment, false - decrease, rating
    if (diff) diff = 1
    else diff = -1;
    updateBookRating(diff, bookId);
    gBooksToDisplay = getBooksToDisplay(gLastSortProperty, gCurrSortDirection);
    document.querySelector('.book-rating').innerHTML = getBookById(bookId).rating;
    renderBooks();
}

function onLangChange(lang) {
    renderTranslation(lang);
    renderBooks();
}

function getPriceByCurrency(price) {
    if (getCurrLang() === 'he') return (price * 3.61).toFixed(2);
    else return price;
}