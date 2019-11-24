import React from 'react';

import Config from '../Config';
import { PhotoType } from '../types/API';

function Photo({ photo }: {
    photo: PhotoType
}) {
    const getURL = (type: string) => Config.url + "photos/" + photo.id + "/file/" + type + (photo.private ? "?key=" + photo.key : "");

    return (
        <a className="photo" href={getURL("full")} target="_blank" rel="noopener noreferrer">
            <img src={getURL("thumbnail")}
                alt={photo.title} title={photo.title} />
        </a>
    );
}

export default Photo;