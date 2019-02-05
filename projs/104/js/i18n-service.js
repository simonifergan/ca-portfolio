const DEFAULT_LOCALE = 'en';

var gLocales = {
    en: {
        title: 'BOOK SHOP',

        // Add book Modal
        'add-book-title': 'Enter new book details:',
        'wrong-input': 'Wrong input, please try again!',
        'book-name': 'Name:',
        'book-author': 'Author:',
        'book-price': 'Price:',

        // Modify book Modal:
        'modify-book-title': 'Enter a new price for the book:',
        'modify-book-current': 'Currently:',

        // buttons
        'btn-apply': 'Apply',
        'btn-cancel': 'Cancel',
        'btn-add-book': 'Add Book',
        'btn-modify-book': 'Modify',
        

        // table interface
        'th-book-name': 'Title',
        'th-book-author': 'Author',
        'th-book-qty': 'Quantity',
        'th-book-price': 'Price',
        'th-book-rating': 'Rating',

    },
    he: {
        title: 'חנות ספרים',

        // Add Modal
        'add-book-title': 'הכנס פרטי כותר חדש:',
        'wrong-input': 'קלט שגוי, אנא נסה שנית!',
        'book-name': 'שם הכותר:',
        'book-author': 'שם המחבר:',
        'book-price': 'מחיר:',
      

        // Modify book Modal:
        'modify-book-title': 'הכנס מחיר חדש עבור: ',
        'modify-book-current': 'המחיר כעת:',

        // Buttons:
        'btn-apply': 'אשר',
        'btn-cancel': 'בטל',
        'btn-add-book': 'הוסף ספר',
        'btn-modify-book': 'ערוך',

        // table interface
        'th-book-name': 'שם הכותר',
        'th-book-author': 'שם המחבר',
        'th-book-qty': 'כמות במלאי',
        'th-book-price': 'מחיר',
        'th-book-rating': 'דירוג',
    },
};

var gCurrLang = 'en'



function getLocales() {
    return gLocales.slice();
}

function setCurrLang(lang) {
    gCurrLang = lang;
}

function getCurrLang() {
    return gCurrLang;
}

function getTranslation(key) {
    let translation = gLocales[gCurrLang][key];
    if (!translation) return gLocales[DEFAULT_LOCALE][key];
    else return translation;
}