import React, { useState, useEffect, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import nailIt from 'nailit';

import * as API from '../API';
import * as Utils from '../Utils';

import QueueItem from './QueueItem';
import { QueueItemType } from '../types/Queue';

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

function Queue({ refresh }: {
    refresh: () => void,
}) {
    const [ files, setFiles ] = useState<File[]>([]);
    const [ uploadQueue, setUploadQueue ] = useState<QueueItemType[]>([]);
    const [ uploading, setUploading ] = useState(false);

    const startUploading = async () => {
        if (uploading) return;
        setUploading(true);

        for (let item of uploadQueue) {
            item.uploading = true;
            item.error = false;
            setUploadQueue([...uploadQueue]);

            const photo = await API.crudUpload('photos', {
                thumbnail: item.thumbnailBlob,
                full: item.blob,
                private: false,
                title: item.name,
            });

            if (photo && !photo.error) {
                item.photo = photo;
            } else {
                item.error = true;
            }

            item.uploading = false;

            setUploadQueue([...uploadQueue]);
        }

        setFiles([]);
        setUploadQueue([]);
        setUploading(false);

        // Updates our photo list in the gallery.
        refresh();
    };

    const updateQueue = useCallback(async (files) => {
        let newQueue = [];
        for (let item of files) {
            const filenameSplit = item.name.split('.');
            if (filenameSplit[0].length > 16) {
                filenameSplit[0] = filenameSplit[0].substring(0, 16) + '...';
            }

            const dataURL = await Utils.readFileAsDataURL(item);
            const thumbnailDataURL = await nailIt(dataURL, 300, true);

            let queueItem: QueueItemType = {
                name: item.name,
                size: item.size,
                displayName: filenameSplit.join('.'),
                dataURL: dataURL,
                blob: await Utils.dataURLToBlob(dataURL),
                thumbnailDataURL: thumbnailDataURL,
                thumbnailBlob: await Utils.dataURLToBlob(thumbnailDataURL),
                uploading: false,
                error: false,
            };

            newQueue.push(queueItem);
        }

        setUploadQueue(newQueue);
    }, [setUploadQueue]);

    useEffect(() => {
        updateQueue(files);
    }, [files, updateQueue]);

    // Allow pasting image data with Ctrl+V.
    const handlePaste = useCallback((event: ClipboardEvent) => {
        if (uploading)
            return;
        
        const items = event.clipboardData.items;
        for (let item of items) {
            const file = item.getAsFile();
            
            if (file && allowedTypes.includes(file.type)) {
                setFiles([...files, file]);
            }
        }
    }, [files, uploading]);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);

        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    return (
        <div className="upload">
            { uploadQueue.length > 0 ?
            <div className="upload__queue">
                {uploadQueue.map((item, i) =>
                    <QueueItem item={item} key={i} uploading={uploading} onRemove={() => {
                        files.splice(i, 1);
                        setFiles([...files]);
                    }} />
                )}
                <button
                    className="upload__button"
                    disabled={uploading}
                    onClick={() => startUploading()}>
                        Begin uploading</button>
            </div>
            : null }
            { uploading ? null :
            <Dropzone onDrop={acceptedFiles => setFiles([...files, ...acceptedFiles])}>
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} accept={allowedTypes.join(',')} />
                    <div>To upload photos, drag and drop image files here</div>
                    <div>or click on this area to open a file selection dialog.</div>
                </div>
                )}
            </Dropzone>
            }
        </div>
    );
}

export default Queue;