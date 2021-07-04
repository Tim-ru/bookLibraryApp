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

bookList.addEventListener('click', function (e) {
    e.target.classList[0] == 'readBtn' || 'listItemName' ? openBook(e) : false
    e.target.classList[0] == 'deleteBtn' ? deleteBook(e) : false
    e.target.classList[0] == 'changeStatusBtn' ? readBook(e) : false
    e.target.classList[0] == 'editBtn' ? editBtn(e) : false
})

function openBook(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    let key = e.target.parentElement.childNodes[0].textContent
    let item = books.find(item => item.name == key)
    let bookName = item.name
    let bookText = item.text
    document.querySelector('.bookTitleText').textContent = bookName
    document.querySelector('.bookText').textContent = bookText
}

function render(arr) {
    bookList.innerHTML = ''
    arr.forEach(e => {
        // create item
        let item = document.createElement('li')
        let p = document.createElement('p')
        p.textContent = e.name
        p.classList.add('listItemName')
        item.appendChild(p)
        item.classList.add('listItem')
        // add buttons
        let readBtn = document.createElement('button')
        let deleteBtn = document.createElement('button')
        let changeBtn = document.createElement('button')
        let editBtn = document.createElement('button')
        readBtn.textContent = 'Прочитать'
        deleteBtn.textContent = 'Удалить'
        changeBtn.textContent = 'Прочитано'
        editBtn.textContent = 'Редактировать'
        item.appendChild(readBtn)
        item.appendChild(deleteBtn)
        item.appendChild(changeBtn)
        item.appendChild(editBtn)
        readBtn.classList.add('readBtn')
        deleteBtn.classList.add('deleteBtn')
        changeBtn.classList.add('changeStatusBtn')
        editBtn.classList.add('editBtn')

        bookList.appendChild(item)
    });
}

function deleteBook(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    // delete from html
    e.target.parentElement.remove()
    // gelete from localeStorage
    let bookName = e.target.parentElement.childNodes[0].textContent;
    console.log(books);
    let item = books.find(item => item.name == bookName)
    let num = books.indexOf(item)
    books.splice(num, 1)
    localStorage.setItem('bookStorage', JSON.stringify(books))
}

function readBook(e) {
    if (!e.target.parentElement.classList.contains('isRead')) {
        e.target.parentElement.classList.add('isRead')
    } else {
        e.target.parentElement.classList.remove('isRead')
    }
}

window.onload = render(JSON.parse(localStorage['bookStorage']))