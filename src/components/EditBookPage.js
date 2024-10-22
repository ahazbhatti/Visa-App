import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditBookForm from './EditBookForm';

const EditBookPage = () => {
    const [books, setBooks] = useState([]);
    const { id } = useParams();

    const fetchBooks = async () => {
        const response = await fetch('http://localhost:3000/books');
        const data = await response.json();
        setBooks(data);
    };
    

    useEffect(() => {
        fetchBooks(); // Fetch the book list on component mount
    }, []);

    const handleUpdateBook = () => {
        fetchBooks(); // Refresh the book list after updating
    };

    const handleDeleteBook = () => {
        fetchBooks(); // Refresh the book list after deletion
    };

    return (
        <div>
            <h1>Edit Book</h1>
            <EditBookForm 
                onUpdateBook={handleUpdateBook} 
                onDeleteBook={handleDeleteBook} 
            />
        </div>
    );
};

export default EditBookPage;