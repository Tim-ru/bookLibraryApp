const addButton = document.querySelector('.addButton')
const loadButton = document.querySelector('.loadButton')
const loadForm = document.forms.loadForm
const bookTitle = document.querySelector('.bookTitle')
const bookList = document.querySelector('.list')

let bookStorage = []

localStorage.removeItem('language')

addButton.addEventListener('click', writeBook)
loadButton.addEventListener('click', sendRequest)

function render(arr) {
    bookList.innerHTML = ''
    arr.forEach(e => {
        let item = document.createElement('li')
        item.textContent = e.login
        console.log(e.login);
        item.classList.add('listItem')
        bookList.appendChild(item)
    });
}

const url = 'https://apiinterns.osora.ru/'

function sendRequest() {
    let formData = new FormData(loadForm);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
        bookStorage.push({
            login: formData.get('login'),
            text: JSON.parse(this.response).text,
            id: Date.now(),
            wasRead: false,
            isFavorite: false
        });
        localStorage.setItem('bookStorage', JSON.stringify(bookStorage));
        render(bookStorage)
    }
    xhr.send(formData);
}

function writeBook() {
    const bookName = document.querySelector('.bookName').value
    const textarea = document.querySelector('.textarea').value
    localStorage.setItem(bookName, JSON.stringify(
        { bookName: bookName, bookText: textarea }
    ))
    // add book to list
    let item = document.createElement('li')
    item.textContent = bookName
    item.classList.add('listItem')
    bookList.appendChild(item)

    // clear
    document.querySelector('.bookTitle').textContent = '';
    document.querySelector('.bookText').textContent = '';
}

