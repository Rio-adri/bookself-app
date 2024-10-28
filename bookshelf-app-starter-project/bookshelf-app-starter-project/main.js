document.addEventListener('DOMContentLoaded', function () {
    const localStorageKey = 'bookshelf';

    // Fungsi untuk menyimpan data ke LocalStorage 
    function saveBooks(books) {
        localStorage.setItem(localStorageKey, JSON.stringify(books));
    }

    // Fungsi untuk mengambil data dari LocalStorage
    function getBooks() {
        return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    }

    // Fungsi untuk menambahkan buku baru
    function addBook(book) {
        const books = getBooks();
        books.push(book);
        saveBooks(books);
    }

    // Fungsi untuk membuat elemen buku secara dinamis
    // Fungsi untuk membuat elemen buku secara dinamis
function renderBook(bookObj) {
    const createTitle = document.createElement('h3');
    createTitle.innerText = bookObj.title;
    createTitle.dataset.testid = 'bookItemTitle'; // Menambahkan data-testid

    const createAuthor = document.createElement('p');
    createAuthor.innerText = `Penulis: ${bookObj.author}`;
    createAuthor.dataset.testid = 'bookItemAuthor'; // Menambahkan data-testid

    const createYear = document.createElement('p');
    createYear.innerText = `Tahun: ${bookObj.year}`;
    createYear.dataset.testid = 'bookItemYear'; // Menambahkan data-testid

    // Tombol selesai baca
    const createFinishButton = document.createElement('button');
    createFinishButton.innerText = bookObj.isComplete ? "Belum Selesai" : "Selesai Baca";
    createFinishButton.dataset.testid = 'bookItemIsCompleteButton'; // Menambahkan data-testid
    createFinishButton.addEventListener('click', function () {
        toggleBookCompletion(bookObj.id);
    });

    // Tombol hapus buku
    const createDeleteButton = document.createElement('button');
    createDeleteButton.innerText = "Hapus Buku";
    createDeleteButton.dataset.testid = 'bookItemDeleteButton'; // Menambahkan data-testid
    createDeleteButton.addEventListener('click', function () {
        deleteBook(bookObj.id);
    });

    // Tombol edit buku 
    const createEditButton = document.createElement('button');
    createEditButton.innerText = "Edit Buku";
    createEditButton.addEventListener('click', function () {
        editBook(bookObj.id);
    });

    const createDivButton = document.createElement('div');
    createDivButton.append(createFinishButton, createDeleteButton, createEditButton);

    const createDiv = document.createElement('div');
    createDiv.setAttribute("id" , "div-book")
    createDiv.dataset.bookid = bookObj.id;
    createDiv.dataset.testid = 'bookItem'; // Menambahkan data-testid
    createDiv.append(createTitle, createAuthor, createYear, createDivButton);

    return createDiv;
}

    // Fungsi untuk toggle status buku 
    function toggleBookCompletion(bookId) {
        let books = getBooks();
        books = books.map(book => {
            if (book.id === bookId) {
                book.isComplete = !book.isComplete;
            }
            return book;
        });
        saveBooks(books);
        renderAllBooks();
    }

    // Fungsi untuk menghapus buku
    function deleteBook(bookId) {
        let books = getBooks();
        books = books.filter(book => book.id !== bookId);
        saveBooks(books);
        renderAllBooks();
    }

    // Fungsi untuk mengedit buku 
    function editBook(bookId) {
        let books = getBooks();
        const book = books.find(book => book.id === bookId);
        if (book) {
            document.getElementById('bookFormTitle').value = book.title;
            document.getElementById('bookFormAuthor').value = book.author;
            document.getElementById('bookFormYear').value = book.year;
            document.getElementById('bookFormIsComplete').checked = book.isComplete;
            deleteBook(bookId); 
        }
    }

    // Fungsi untuk menampilkan seluruh buku
    function renderAllBooks(books = getBooks()) {
        const incompleteBookList = document.getElementById('incompleteBookList');
        const completeBookList = document.getElementById('completeBookList');

        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';

        books.forEach(book => {
            const bookElement = renderBook(book);
            if (book.isComplete) {
                completeBookList.append(bookElement);
            } else {
                incompleteBookList.append(bookElement);
            }
        });
    }

    // Fungsi untuk mencari buku berdasarkan judul
    function searchBook(keyword) {
        const books = getBooks();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()) );
        const parent = document.getElementById('searchBook');
        if(filteredBooks.length!==0 ){
            for(let i = 0; i<filteredBooks.length ; i++){
            
                    parent.append(renderBook(filteredBooks[i]));
                
            }
        } else {
            alert('buku tidak ditemukan');
        }
    
        
    }

    // Event listener untuk pencarian buku
    const searchBar = document.getElementById('searchBook')
    searchBar.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTitle = document.getElementById('searchBookTitle').value;
        searchBook(searchTitle);
    });

   

    // Event listener untuk menambah buku baru
    document.getElementById('bookForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const inputTitle = document.getElementById('bookFormTitle').value;
        const inputAuthor = document.getElementById('bookFormAuthor').value;
        const inputYear = document.getElementById('bookFormYear').value;
        const isComplete = document.getElementById('bookFormIsComplete').checked;

        if (!inputTitle || !inputAuthor || !inputYear || isNaN(inputYear)) {
            alert('Pastikan semua kolom diisi dengan benar!');
            return;
        }

        const book = {
            id: new Date().getTime(),
            title: inputTitle,
            author: inputAuthor,
            year: parseInt(inputYear),
            isComplete: isComplete,
        };

        addBook(book);
        renderAllBooks();
        form.reset();
    });

    // Memanggil fungsi untuk menampilkan semua buku saat halaman dimuat
    renderAllBooks();
});
