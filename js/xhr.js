const addButton = document.querySelector('.addButton')
const loadButton = document.querySelector('.loadButton')
const loadForm = document.forms.loadForm
const writeForm = document.forms.writeForm

const url = 'https://apiinterns.osora.ru/'

let bookStorage = []

localStorage.removeItem('language')

addButton.addEventListener('click', writeBook)
loadButton.addEventListener('click', sendRequest)

function sendRequest() {
    let formData = new FormData(loadForm);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
        bookStorage.push({
            name: formData.get('name'),
            text: JSON.parse(this.response).text,
            isRead: false,
            isFavorite: false,
            id: Date.now()
        });
        localStorage.setItem('bookStorage', JSON.stringify(bookStorage));
        render(bookStorage)
    }
    xhr.send(formData);
}

function writeBook() {
    if (localStorage['bookStorage'] != undefined) {
        bookStorage = JSON.parse(localStorage['bookStorage'])
    }
    let formData = new FormData(writeForm);
    bookStorage.push({
        name: formData.get('name'),
        text: formData.get('text'),
        isRead: false,
        isFavorite: false,
        id: Date.now()
    })
    localStorage.setItem('bookStorage', JSON.stringify(bookStorage))
    render(bookStorage)
}