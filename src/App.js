import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import AddBookForm from './components/AddBookForm';
import BookCard from './components/BookCard';
import EditBookForm from './components/EditBookForm'; // Import the EditBookForm component
import BookDetails from './components/BookDetails';

function App() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    
    const fetchBooks = async () => {
        const response = await fetch('http://localhost:5001/books');
        const data = await response.json();
        console.log('Fetched books:', data);
        setBooks(data); // Sets the fetched books in the state
    };
    const handleEdit = (book) => {
        setEditingBook(book);
    };
    
   
   

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this book?`)) {
            await fetch(`http://localhost:5001/books/${id}`, {
                method: 'DELETE',
            });
            fetchBooks(); // Refresh the book list
        }
    };

  

    return (
        <Router>
            <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px' }}>
                <h1>Visa Books</h1>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/add-book">Add Book</Link>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {books.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                            <Chatbot />
                        </div>
                    } />
                    <Route path="/add-book" element={
                        <AddBookForm onAddBook={fetchBooks} editingBook={editingBook} setEditingBook={setEditingBook} />
                    } />
                    <Route path="/edit-book/:id" element={
                        <EditBookForm onUpdateBook={fetchBooks} />
                    } />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;