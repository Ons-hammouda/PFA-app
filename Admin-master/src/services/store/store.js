import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers';

const persistConfig = {
    key: 'KF1',
    storage,
    whitelist: ['email', 'name', 'role_id', 'user_id', 'isAuthenticated'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Define a callback function to configure middleware
const configureMiddleware = () => {
    return [thunk];
};

const store = configureStore({
    reducer: persistedReducer,
    middleware: configureMiddleware, // Pass the callback function
});

const persistor = persistStore(store);

export { store, persistor };