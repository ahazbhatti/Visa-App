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
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)' // Optional: Add a background color for better contrast
        }}>
            <h2 style={{ color: 'white' }}>{book.title}</h2>
            <p style={{ color: 'white' }}>Author: {book.author}</p>
            <p style={{ color: 'white' }}>Year: {book.year}</p>
            <p style={{ color: 'white' }}>Genre: {book.genre}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link to={`/edit-book/${book.id}`}>
                    <button style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '4px', padding: '5px 10px' }}>Edit</button>
                </Link>
                <button 
                    onClick={() => handleDelete(book.id)} 
                    style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '4px', padding: '5px 10px' }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default BookCard;