import React from 'react';
import filesize from 'filesize';

import { QueueItemType } from '../types/Queue';

function QueueItem({ item, onRemove }: {
    item: QueueItemType,
    onRemove: () => void,
}) {
    return (
        <div className="item">
            <img alt="Thumbnail" src={ item.thumbnailDataURL } />
            <div className="item__metadata">
                <div title={ item.name }>{ item.displayName }</div>
                <div>{ filesize(item.size) }</div>
            </div>
            <div className="item__actions">
                <button onClick={onRemove}>Remove</button>
            </div>
        </div>
    );
}

export default QueueItem;