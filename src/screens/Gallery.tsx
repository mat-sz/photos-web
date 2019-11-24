import React, { useState, useEffect } from 'react';

import Queue from '../components/Queue';
import Photos from '../components/Photos';
import { crudIndex } from '../API';

function Gallery() {
    const [ loading, setLoading ] = useState(true);
    const [ photos, setPhotos ] = useState([]);

    const updatePhotos = async () => {
        setLoading(true);
        
        const json = await crudIndex('photos');
        if (json && !json.error && Array.isArray(json)) {
            setPhotos(json);
        }

        setLoading(false);
    };

    useEffect(() => {
        updatePhotos();
    }, []);
    
    return (
        <div className="gallery">
            <h1>Your gallery</h1>
            <Queue refresh={() => updatePhotos()} />
            <Photos loading={loading} photos={photos} />
        </div>
    );
}

export default Gallery;