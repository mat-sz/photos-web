import { createStore } from 'redux';

import reducers, { StoreType } from './reducers';

const newStore = (): StoreType => {
    const store = createStore(
        reducers,
    );

    return store;
};

export default newStore;