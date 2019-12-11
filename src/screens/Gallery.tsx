import React, { useState, useEffect, useCallback } from 'react';

import Queue from '../components/Queue';
import Photos from '../components/Photos';
import { crudIndex } from '../API';
import { PhotoType } from '../types/API';

function Gallery() {
    const [ loading, setLoading ] = useState(true);
    const [ photos, setPhotos ] = useState<PhotoType[]>([]);

    const updatePhotos = useCallback(async () => {
        setLoading(true);
        
        const json = await crudIndex('photos');
        if (json && !json.error && Array.isArray(json)) {
            setPhotos(json);
        }

        setLoading(false);
    }, [setPhotos]);

    useEffect(() => {
        updatePhotos();
    }, [updatePhotos]);
    
    return (
        <div className="gallery">
            <section>
                <h2>Your gallery</h2>
                <Queue refresh={updatePhotos} />
                <Photos loading={loading} photos={photos} />
            </section>
        </div>
    );
}

export default Gallery;