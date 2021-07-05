const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')
const bookList = document.querySelector('.list')
const favoritesBookField = document.querySelector('.favoritesBookField')


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
    sort()
    bookList.innerHTML = ''
    let books = JSON.parse(localStorage['bookStorage'])
    books.forEach(e => {
        // create item
        let item = document.createElement('li')
        let p = document.createElement('p')
        p.textContent = e.name
        p.classList.add('listItemName')
        item.appendChild(p)
        item.classList.add('listItem')
        item.setAttribute('draggable', true);
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

        item.ondragstart = drag

        if (e.isRead === true) {
            item.classList.add('isRead')
        } else {
            item.classList.remove('isRead')
        }


        bookList.appendChild(item)
        
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
    let item = books.find(item => item.name == bookName)
    let num = books.indexOf(item)
    books[num].isRead = !books[num].isRead
    localStorage.setItem('bookStorage', JSON.stringify(books))
    render(JSON.parse(localStorage['bookStorage']))
    sort()
}

function editBtn(e) {
    let books = JSON.parse(localStorage['bookStorage'])
    let bookName = e.target.parentElement.childNodes[0].textContent;
    let item = books.find(item => item.name == bookName)
    let num = books.indexOf(item)
    let bookText = item.text;
    let editForm = document.createElement('form')
    editForm.classList.add('editForm')
    
    let changeTitle = document.createElement('h4')
    changeTitle.textContent = 'Редактирование книги'

    let changeInput = document.createElement('input')
    changeInput.setAttribute('value', bookName)
    changeInput.setAttribute('type', bookName)

    let changeTextarea = document.createElement('textarea')
    changeTextarea.textContent = bookText

    let changeFormBtn = document.createElement('button')
    changeFormBtn.textContent = 'Изменить'
    changeFormBtn.onclick = function() {
        books[num].login = changeInput.value
        books[num].text = changeTextarea.value
        localStorage.setItem('bookStorage', JSON.stringify(books))
    }

    editForm.appendChild(changeTitle)
    editForm.appendChild(changeInput)
    editForm.appendChild(changeTextarea)
    editForm.appendChild(changeFormBtn)
    document.querySelector('.book').appendChild(editForm)
    // writeForm.elements.name.value = bookName
    // writeForm.elements.text.value = item.text
}

function sort() {
    let books = JSON.parse(localStorage['bookStorage'])
    books.sort((a) => a.isRead == false ? 1 : -1);
    localStorage.setItem('bookStorage', JSON.stringify(books))
}

// drag and drop
// favoritesBookField.ondragover = allowDrop

// function allowDrop(event) {
//     event.preventDefault()
// }

// function drag (event) {
//     event.dataTransfer.setData('id', event.target.id);
// }

// favoritesBookField.ondrop = drop

// function drop(event) {
//     let itemId = event.
// }

window.onload = render(JSON.parse(localStorage['bookStorage']))