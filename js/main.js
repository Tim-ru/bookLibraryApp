const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')
const bookList = document.querySelector('.list')
const favoritesBookField = document.querySelector('.favoritesBookField')
const editFormField = document.querySelector('.editForm')


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
    e.target.classList[0] == 'readBtn' ? openBook(e) : false
    e.target.classList[0] == 'deleteBtn' ? deleteBook(e) : false
    e.target.classList[0] == 'changeStatusBtn' ? readBook(e) : false
    e.target.classList[0] == 'editBtn' ? editBtn(e) : false
})

favoritesBookField.addEventListener('click', function (e) {
    e.target.classList[0] == 'readBtn' ? openBook(e) : false
    e.target.classList[0] == 'deleteBtn' ? deleteBook(e) : false
    e.target.classList[0] == 'changeStatusBtn' ? readBook(e) : false
    e.target.classList[0] == 'editBtn' ? editBtn(e) : false
})

function openBook(e) {
    document.querySelector('.book').innerHTML = ''
    let books = JSON.parse(localStorage['bookStorage'])
    let item = books.find(item => item.id == e.target.parentElement.id)
    
    let bookName = item.name
    let bookText = item.text
    let readArea = document.createElement('div')

    let bookTitleText = document.createElement('h4')
    bookTitleText.textContent = bookName

    let bookTextContainer = document.createElement('p')
    bookTextContainer.textContent = bookText

    readArea.appendChild(bookTitleText)
    readArea.appendChild(bookTextContainer)

    document.querySelector('.book').appendChild(readArea)
}

function render(arr) {
    sort()
    bookList.innerHTML = ''
    favoritesBookField.innerHTML = ''
    let books = JSON.parse(localStorage['bookStorage'])
    books.forEach(e => {
        // create item
        let item = document.createElement('li')
        if (e.isFavorite == true) {
            favoritesBookField.appendChild(item)
        } else {
            bookList.appendChild(item)
        }
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
        readBtn.textContent = '??????????????????'
        deleteBtn.textContent = '??????????????'
        changeBtn.textContent = '??????????????????'
        editBtn.textContent = '??????????????????????????'
        item.appendChild(readBtn)
        item.appendChild(deleteBtn)
        item.appendChild(changeBtn)
        item.appendChild(editBtn)
        readBtn.classList.add('readBtn')
        deleteBtn.classList.add('deleteBtn')
        changeBtn.classList.add('changeStatusBtn')
        editBtn.classList.add('editBtn')
        let id = e.id.toString()

        item.ondragstart = drag
        item.ondragend = dragend
        item.setAttribute('id', id)
        item.setAttribute('draggable', true);

        if (e.isRead === true) {
            item.classList.add('isRead')
        } else {
            item.classList.remove('isRead')
        }
    });
}

function deleteBook(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    // delete from html
    e.target.parentElement.remove()
    // gelete from localeStorage
    let bookName = e.target.parentElement.childNodes[0].textContent;
    let item = books.find(item => item.name == bookName)
    let num = books.indexOf(item)
    books.splice(num, 1)
    localStorage.setItem('bookStorage', JSON.stringify(books))
}

function readBook(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    let bookName = e.target.parentElement.childNodes[0].textContent;
    console.log(e.target.parentElement.id);
    let item = books.find(item => item.id == e.target.parentElement.id)
    let num = books.indexOf(item)
    books[num].isRead = !books[num].isRead
    localStorage.setItem('bookStorage', JSON.stringify(books))
    render()
    sort()
}

function editBtn(e) {
    document.querySelector('.book').innerHTML = ''
    let books = JSON.parse(localStorage['bookStorage'])
    let bookName = e.target.parentElement.childNodes[0].textContent;
    let item = books.find(item => item.id == e.target.parentElement.id)
    let num = books.indexOf(item)
    let bookText = item.text;
    let editForm = document.createElement('form')
    editForm.classList.add('editForm')

    let changeTitle = document.createElement('h4')
    changeTitle.textContent = '???????????????????????????? ??????????'

    let changeInput = document.createElement('input')
    changeInput.setAttribute('value', bookName)
    changeInput.setAttribute('type', bookName)

    let changeTextarea = document.createElement('textarea')
    changeTextarea.textContent = bookText

    let changeFormBtn = document.createElement('button')
    changeFormBtn.textContent = '????????????????'
    
    changeFormBtn.onclick = function () {
        books[num].name = changeInput.value
        books[num].text = changeTextarea.value
        localStorage.setItem('bookStorage', JSON.stringify(books))
    }

    editForm.appendChild(changeTitle)
    editForm.appendChild(changeInput)
    editForm.appendChild(changeTextarea)
    editForm.appendChild(changeFormBtn)
    document.querySelector('.book').appendChild(editForm)
}

function sort() {
    let books = JSON.parse(localStorage['bookStorage'])
    books.sort((a) => a.isRead == false ? 1 : -1);
    localStorage.setItem('bookStorage', JSON.stringify(books))
}

// drag and drop
favoritesBookField.ondragover = allowDrop
favoritesBookField.ondrop = drop
bookList.ondragover = allowDrop
bookList.ondrop = drop

function allowDrop(event) {
    event.preventDefault()
}

let dropElement
let list
let listItem

function drag(event) {
    event.dataTransfer.setData('id', event.target.id);
    dropElement = event.target
    favoritesBookField.style.border = "2px dashed black"
    bookList.style.border = "2px dashed black"
    list = event.target.parentElement
    listItem = event.target
}

function dragend(event) {
    bookList.innerHTML = ''
    favoritesBookField.innerHTML = ''
    dropElement = event.target
    render()
}

function drop(event) {
    let itemId = event.dataTransfer.getData('id')
    let books = JSON.parse(localStorage['bookStorage'])
    let item = books.find(item => item.id == itemId)
    let num = books.indexOf(item)
    console.log(dropElement.parentElement);
    books[num].isFavorite = true
    if (dropElement.parentElement == favoritesBookField) {
        books[num].isFavorite = false
    } else if (dropElement.parentElement == bookList){
        books[num].isFavorite = true
    }
    localStorage.setItem('bookStorage', JSON.stringify(books))
    favoritesBookField.style.border = ""
    bookList.style.border = ""
}

window.onload = render