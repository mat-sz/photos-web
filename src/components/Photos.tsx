import React from 'react';

import Photo from './Photo';
import { PhotoEntity } from '../types/Entities';

function Photos({ photos }: { photos: PhotoEntity[] }) {
  return (
    <div className="photos">
      <div className="photo-grid">
        {photos.length === 0
          ? "You don't have any photos."
          : photos.map((photo, i) => <Photo photo={photo} key={i} />)}
      </div>
    </div>
  );
}

export default Photos;
