import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BookCard({ book, onDelete }) {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDelete = async (id) => {
        await onDelete(id); // Call onDelete to remove the book
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            <p>Genre: {book.genre}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link to={`/edit-book/${book.id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
        </div>
    );
}

export default BookCard;