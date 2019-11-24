import React from 'react';

import SpinnerOverlay from './SpinnerOverlay';
import Photo from './Photo';
import { PhotoType } from '../types/API';

function Photos({ loading, photos }: {
    loading: boolean,
    photos: PhotoType[]
}) {
    return (
        <section className="photos">
            { loading ? <SpinnerOverlay /> : null }
            <h2>Photos</h2>
            <div className="photo-grid">
                { photos.length === 0 ?
                "You don't have any photos." :
                photos.map((photo, i) => <Photo photo={photo} key={i} />)}
            </div>
        </section>
    );
}

export default Photos;