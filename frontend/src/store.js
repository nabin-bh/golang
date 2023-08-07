import { configureStore } from '@reduxjs/toolkit';
import bookStoreReducer from './redux/bookStore';

const Store = configureStore({
    reducer: {
        posts: bookStoreReducer,
    },
});

export default Store;
