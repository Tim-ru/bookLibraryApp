const writeBookRadio = document.getElementById('writeBookRadio')
const loadBookRadio = document.getElementById('loadBookRadio')

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

function main() {

    const writeForm = document.querySelector('.writeForm')
    const bookList = document.querySelector('.list')




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

