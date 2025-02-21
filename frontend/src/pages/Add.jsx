import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBooks] = useState({
        title: "",
        description: "",
        cover: "",
        price: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBooks(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/book", book);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="form">
        <h1>Add New Book</h1>
        <input type="text" placeholder="Title" name="title" onChange={handleChange} />
        <input type="text" placeholder="Description" name="description" onChange={handleChange} />
        <input type="text" placeholder="Cover Image URL" name="cover" onChange={handleChange} />
        <input type="number" placeholder="Price" name="price" onChange={handleChange} />
        <div>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    </div>
    

    );
};

export default Add;

