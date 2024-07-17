import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/apod.css';
import { Link } from 'react-router-dom';

const APOD = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/apod`)
            .then(response => {
                setApodData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='container'>
            <div className='header'>
                <p><Link className='custom-link' to={`/view`}>constellation</Link></p>
                <h1>Astro</h1>
                <p><Link className='custom-link' to={`/telescope`}>telescope</Link></p>
            </div>
            <h1>{apodData.title}</h1>
            <img src={apodData.url} alt={apodData.title} />
            <p>{apodData.explanation}</p>
        </div>
    );
};

export default APOD;
