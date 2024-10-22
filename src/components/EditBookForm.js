import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookForm = ({ onUpdateBook, onDeleteBook }) => {
    const [book, setBook] = useState({ title: '', author: '', year: '', genre: '' });
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Failed to fetch book:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch(`http://localhost:5001/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            onUpdateBook(); 
            navigate('/'); // rdirect back to the home page
        } catch (error) {
            console.error('Failed to update book:', error);
        }
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Book Title"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Year"
                value={book.year}
                onChange={(e) => setBook({ ...book, year: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Genre"
                value={book.genre}
                onChange={(e) => setBook({ ...book, genre: e.target.value })}
                required
            />
            <button type="submit">Update Book</button>
        
        </form>
    );
};



export default EditBookForm;