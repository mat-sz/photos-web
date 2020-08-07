import React from 'react';

import { url } from '../sagas/http';
import { PhotoEntity } from '../types/Entities';

function Photo({ photo }: { photo: PhotoEntity }) {
  const getURL = (type: string) =>
    url +
    'photos/' +
    photo.id +
    '/file/' +
    type +
    (photo.private ? '?key=' + photo.key : '');

  return (
    <a
      className="photo"
      href={getURL('full')}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={getURL('thumbnail')} alt={photo.title} title={photo.title} />
    </a>
  );
}

export default Photo;
