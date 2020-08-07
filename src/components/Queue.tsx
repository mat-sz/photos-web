import React, { useState, useEffect, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { fromImage } from 'imtool';
import uuid from 'uuid/v4';

import * as Utils from '../Utils';

import QueueItem from './QueueItem';
import { QueueItemType } from '../types/Queue';
import { useDispatch } from 'react-redux';
import { ActionType } from '../types/ActionType';

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

function Queue({ refresh }: { refresh: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadQueue, setUploadQueue] = useState<QueueItemType[]>([]);
  const dispatch = useDispatch();

  const startUploading = async () => {
    for (let item of uploadQueue) {
      dispatch({ type: ActionType.QUEUE_ADD, value: item });
    }

    setFiles([]);
    setUploadQueue([]);
  };

  const updateQueue = useCallback(
    async files => {
      let newQueue = [];
      for (let item of files) {
        const filenameSplit = item.name.split('.');
        if (filenameSplit[0].length > 16) {
          filenameSplit[0] = filenameSplit[0].substring(0, 16) + '...';
        }

        const dataURL = await Utils.readFileAsDataURL(item);
        const tool = await fromImage(dataURL);
        const thumbnailDataURL = await tool.thumbnail(300, true).toDataURL();

        let queueItem: QueueItemType = {
          id: uuid(),
          name: item.name,
          size: item.size,
          displayName: filenameSplit.join('.'),
          dataURL: dataURL,
          blob: await Utils.dataURLToBlob(dataURL),
          thumbnailDataURL: thumbnailDataURL,
          thumbnailBlob: await Utils.dataURLToBlob(thumbnailDataURL),
        };

        newQueue.push(queueItem);
      }

      setUploadQueue(newQueue);
    },
    [setUploadQueue]
  );

  useEffect(() => {
    updateQueue(files);
  }, [files, updateQueue]);

  const onDrop = (acceptedFiles: File[]) =>
    setFiles([...files, ...acceptedFiles]);

  // Allow pasting image data with Ctrl+V.
  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData.items;
      for (let item of items) {
        const file = item.getAsFile();

        if (file && allowedTypes.includes(file.type)) {
          setFiles([...files, file]);
        }
      }
    },
    [files]
  );

  useEffect(() => {
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div className="upload">
      {uploadQueue.length > 0 ? (
        <div className="upload__queue">
          {uploadQueue.map((item, i) => {
            const onRemove = () => {
              files.splice(i, 1);
              setFiles([...files]);
            };

            return <QueueItem item={item} key={i} onRemove={onRemove} />;
          })}
          <button className="upload__button" onClick={startUploading}>
            Begin uploading
          </button>
        </div>
      ) : null}
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} accept={allowedTypes.join(',')} />
            <div>To upload photos, drag and drop image files here</div>
            <div>or click on this area to open a file selection dialog.</div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default Queue;
