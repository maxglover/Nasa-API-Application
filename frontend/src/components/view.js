import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/view.css';

const VIEW = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


    const fetchImages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/view`, {
                params: { q: query }
            });
            setImages(response.data.collection.items.slice(0, 6));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };


    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchTerm);
    };

    useEffect(() => {
        fetchImages();
    }, [query]);

    return (
        <div className='container'>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search for images..."
                />
                <button type="submit">Search</button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                {images.map((image) => (
                    <div key={image.data[0].nasa_id} style={{ width: '200px' }}>
                        <img 
                            src={image.links[0].href} 
                            alt={image.data[0].title} 
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <p>{image.data[0].title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VIEW;
