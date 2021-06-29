window.onload = function () {
    const writeBookRadio = document.getElementById('writeBookRadio')
    const loadBookRadio = document.getElementById('loadBookRadio')
    const writeBook = document.querySelector('.writeBook')
    const loadBook = document.querySelector('.loadBook')
    const loadButton = document.querySelector('.loadButton')
    const bookList = document.querySelector('.list')

    const bookStorage = []


    writeBookRadio.addEventListener('change', function () {
        if (this.checked) {
            writeBook.style.display = 'block'
            loadBook.style.display = 'none'
        }
    })

    loadBookRadio.addEventListener('change', function () {
        if (this.checked) {
            loadBook.style.display = 'block'
            writeBook.style.display = 'none'
        }
    })

    loadButton.addEventListener('click', addBook)

    const url = 'https://apiinterns.osora.ru/'
    const form = document.querySelector('.loadForm')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const files = document.querySelector('[type=file]').files;
        const formData = new FormData();

        // for (let i = 0; i < files.length; i++) {
        //     let file = files[i]

        //     formData.append('files[]', file)
        //     fetch(url, {
        //         method: 'POST',
        //         body: formData,
        //     }).then((response) => {
        //         console.log(response)
        //     })
        // }


        // отослать
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send(formData);
        console.log(formData.get('files[]'));
    })

    function addBook() {
        const bookName = document.querySelector('.bookName').value
        const textarea = document.querySelector('.textarea').value
        document.querySelector('.bookTitle').textContent = bookName
        document.querySelector('.bookText').textContent = textarea
        console.log(bookStorage);
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