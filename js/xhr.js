const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')
const addButton = document.querySelector('.addButton')
const loadButton = document.querySelector('.loadButton')


const bookStorage = []

localStorage.removeItem('language')

writeBookRadio.addEventListener('change', function () {
    if (this.checked) {
        writeForm.style.display = 'block'
        loadForm.style.display = 'none'
    }
})

loadBookRadio.addEventListener('change', function () {
    if (this.checked) {
        loadForm.style.display = 'block'
        writeForm.style.display = 'none'
    }
})

addButton.addEventListener('click', writeBook)
loadButton.addEventListener('click', sendRequest)

const url = 'https://apiinterns.osora.ru/'

function sendRequest() {
    let bookStorage = [];
    localStorage['bookStorage'] != undefined ? bookStorage = JSON.parse(localStorage['bookStorage']) : console.log('localStorage пуст')
    let formData = new FormData(loadForm);
    console.log(formData);
    let xhr = new XMLHttpRequest();
    const bookName = document.querySelector('.bookTitle').value

    xhr.open("POST", url);
    xhr.onreadystatechange = function () {

        bookStorage.push({
            login: formData.get('login'),
            text: JSON.parse(this.response).text,
            id: Date.now(),
            wasRead: false,
            isFavorite: false
        });
        localStorage.setItem('bookStorage', JSON.stringify(
            { bookName: bookName, bookText: textarea }
        ));
        loadForm.submit()

    }
    xhr.send(formData);
}

function writeBook() {
    let bookStorage = [];
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