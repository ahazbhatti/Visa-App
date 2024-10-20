const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2020, genre: 'Fiction' },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2021, genre: 'Non-Fiction' },
];

// Existing GET all books route
app.get('/books', (req, res) => {
    res.json(books);
});

// New GET single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Existing POST route to add a new book
app.post('/books', (req, res) => {
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json({ message: 'Book has been added', book: newBook });
});

// New PUT route to update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
        const updatedBook = { ...books[bookIndex], ...req.body };
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Existing DELETE route to remove a book
app.delete('/books/:id', (req, res) => {
    books = books.filter(book => book.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Start the server
app.listen(5001, () => {
    console.log('Server running on port 5001');
});