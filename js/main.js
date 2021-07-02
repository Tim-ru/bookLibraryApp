function main() {
    const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')
    const writeForm = document.querySelector('.writeForm')
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

