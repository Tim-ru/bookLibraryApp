const addButton = document.querySelector('.addButton')
const loadButton = document.querySelector('.loadButton')
const loadForm = document.forms.loadForm
const writeForm = document.forms.writeForm


let bookStorage = []

localStorage.removeItem('language')

addButton.addEventListener('click', writeBook)
loadButton.addEventListener('click', sendRequest)



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
    let formData = new FormData(writeForm);
    bookStorage.push({
        login: formData.get('login'), 
        text: formData.get('text'),
        id: Date.now(),
        wasRead: false,
        isFavorite: false
    })
    localStorage.setItem('bookStorage', JSON.stringify(bookStorage))
    render(bookStorage)
}

