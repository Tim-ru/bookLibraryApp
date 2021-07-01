window.onload = function () {
    
    const writeForm = document.querySelector('.writeForm')
    const loadForm = document.querySelector('.loadForm')
    const bookList = document.querySelector('.list')
    const listItems = document.querySelectorAll('.listItem')

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key([i]);
        console.log(element);
        let item = document.createElement('li')
        item.textContent = element
        item.classList.add('listItem')
        bookList.appendChild(item)
    }


    addButton.addEventListener('click', writeForm)
    bookList.addEventListener('click', function openBook(e) {
        if (e.target.classList[0] == 'listItem') {
            const bookName = e.target.textContent
            const bookText = localStorage.getItem(bookName)
            let text = JSON.parse(bookText)
            document.querySelector('.bookTitle').textContent = bookName
            document.querySelector('.bookText').textContent = text.bookText
        }
    })
}