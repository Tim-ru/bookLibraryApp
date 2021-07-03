const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')
const bookList = document.querySelector('.list')


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

bookList.addEventListener('click', function openBook(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    let key = e.target.textContent
    let item = books.find(item => item.login == key)
    console.log(item);
    if (e.target.classList[0] == 'listItem') {
        const bookName = key
        const bookText = item.text
        console.log(typeof bookName);
        document.querySelector('.bookTitleText').textContent = e.target.textContent
        document.querySelector('.bookText').textContent = bookText
    }
})

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
