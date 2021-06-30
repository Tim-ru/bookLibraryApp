window.onload = function () {
    const writeBookRadio = document.getElementById('writeBookRadio')
    const loadBookRadio = document.getElementById('loadBookRadio')
    const writeForm = document.querySelector('.writeForm')
    const loadForm = document.querySelector('.loadForm')
    const loadButton = document.querySelector('.loadButton')
    const bookList = document.querySelector('.list')
    const listItems = document.querySelectorAll('.listItem')

    const bookStorage = []
    localStorage.removeItem('language')

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key([i]);
        console.log(element);
        let item = document.createElement('li')
        item.textContent = element
        item.classList.add('listItem')
        bookList.appendChild(item)
    }

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

    loadButton.addEventListener('click', addBook)
    bookList.addEventListener('click', function openBook(e) {
        if (e.target.classList[0] == 'listItem') {
            const bookName = e.target.textContent
            const bookText = localStorage.getItem(bookName)
            let text = JSON.parse(bookText)
            document.querySelector('.bookTitle').textContent = bookName
            document.querySelector('.bookText').textContent = text.bookText
        }
    })

    const url = 'https://jsonplaceholder.typicode.com/users'
    const loadBook = document.querySelector('.loadForm')
    // loadBook.addEventListener('submit', (e) => {
    //     e.preventDefault()

    //     const formData = new FormData(loadForm);

    //     // отослать
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("POST", url);
    //     xhr.send()
    //     xhr.onload = function () {
    //         let answer = this.response;
    //         bookStorage.push({
    //             login: formData.get('login'),
    //             text: JSON.parse(answer).text,
    //             readed: false
    //         })
    //         addBook(e)
    //         console.log(bookStorage);
    //     }

    // })

    // function sendRequest(method, url, body = null) {
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     }
    //     return fetch(url, {
    //         method: method,
    //         body: JSON.stringify(body),
    //         headers: headers
    //     }).then(response => {
    //         return response.json()
    //     })
    // }


    // const body = {
    //     login: formData.get('login'),
    //     text: 'text',
    //     readed: false
    // }

    // sendRequest('POST', url, body)
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err))


    function addBook() {
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

    // function loadBookFile() {

    // }




}