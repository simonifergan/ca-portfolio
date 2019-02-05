

function renderAddBookModal() {
    document.querySelector('.modal-bg').style.display = 'flex';
    document.querySelector('.add-book-form').style.display = 'flex';
}

function renderModifyBookModal(bookId) {
    book = getBookById(bookId);
    let currency = (getCurrLang() === 'he')? '₪' : '$';
    document.querySelector('.modal-bg').style.display = 'flex';
    document.querySelector('.modal-modify-book').style.display = 'flex';
    // update buttons:
    document.querySelector('.modal-modify-book .modal-btns-container').innerHTML = `
            <button data-trans="btn-apply" onclick="onUpdateBookPrice(event, '${bookId}')" class="btn btn-add">Apply</button>
            <button data-trans="btn-cancel" onclick="onCloseModal(event)" class="btn btn-delete">Cancel</button>`;
    document.querySelector('.book-name-span').innerHTML = `"${book.name}".`;
    document.querySelector('.book-price-span').innerHTML = currency + getPriceByCurrency(book.price);
    renderTranslation(getCurrLang());
}

function renderViewBookModal(bookId) {
    document.querySelector('.modal-bg').style.display = 'flex';
    let book = getBookById(bookId);
    let strHtml = ` <img class="book-cover" src="img/${book.coverSrc}" alt="Book Cover"/ >
                    <div class="view-book-content">
                        <div>Name: ${book.name}</div>
                        <div>Author: ${book.author}</div>
                        <div class="rating-box">
                            <div>Rating:</div>
                            <button onclick="onBookRatingChange(false, '${book.id}')" class="btn btn-modify">−</button>
                            <div class="book-rating">${book.rating}</div>
                            <button onclick="onBookRatingChange(true, '${book.id}')" class="btn btn-add">＋</button>
                        </div>
                    </div>
                    <button onclick="onCloseModal(event)" class="btn btn-delete">Close</button>
                   `;

    let elViewBook = document.querySelector('.modal-view-book');
    elViewBook.innerHTML = strHtml;
    elViewBook.style.display = 'flex';
    renderTranslation(getCurrLang());
}

function onCloseModal(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    document.querySelector('.modal-form').reset();
    document.getElementById('newBookPrice').value = '';
    document.querySelector('.modal-form').style.display = 'none';
    document.querySelector('.modal-view-book').style.display = 'none';
    document.querySelector('.modal-modify-book').style.display = 'none';
    document.querySelector('.modal-bg').style.display = 'none';
    renderBooks();
}

window.addEventListener('keydown', onModalKeyPress);
function onModalKeyPress(ev) {
    if (ev.code === 'Escape') onCloseModal(ev);
    else return;
}