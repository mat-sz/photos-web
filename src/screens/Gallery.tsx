import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Queue from '../components/Queue';
import Photos from '../components/Photos';
import { StateType } from '../reducers';
import { ActionType } from '../types/ActionType';

function Gallery() {
  const dispatch = useDispatch();
  const photos = useSelector((state: StateType) => state.photoState.photos);

  const updatePhotos = useCallback(async () => {
    dispatch({ type: ActionType.FETCH_PHOTOS });
  }, [dispatch]);

  useEffect(() => {
    updatePhotos();
  }, [updatePhotos]);

  return (
    <div className="gallery">
      <section>
        <h2>Your gallery</h2>
        <Queue refresh={updatePhotos} />
        <Photos photos={photos} />
      </section>
    </div>
  );
}

export default Gallery;
