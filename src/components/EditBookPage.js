import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditBookForm from './EditBookForm';

const EditBookPage = () => {
    const [books, setBooks] = useState([]);
    const { id } = useParams();

    const fetchBooks = async () => {
        const response = await fetch('http://localhost:5001/books');
        const data = await response.json();
        setBooks(data);
    };
    

    useEffect(() => {
        fetchBooks(); 
    }, []);

    const handleUpdateBook = () => {
        fetchBooks(); 
    };

    const handleDeleteBook = () => {
        fetchBooks(); 
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