import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddBookForm({ onAddBook, editingBook, setEditingBook }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setYear(editingBook.year);
            setGenre(editingBook.genre);
        } else {
            setTitle('');
            setAuthor('');
            setYear('');
            setGenre('');
        }
    }, [editingBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, author, year, genre };
        await fetch('http://localhost:5001/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });

        setMessage('Book has been added!');
        onAddBook();
        setEditingBook(null);

        setTimeout(() => {
            setMessage('');
            navigate('/'); // Navigate back to the home page
        }, 3000);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
                <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
                <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
                <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddBookForm;