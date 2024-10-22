// src/components/BookDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL


    return (
        <div>
            <h2>Book Details</h2>
            <p>Details for book with ID: {id}</p>
            {/* Display more details about the book here */}
        </div>
    );
};

export default BookDetails;