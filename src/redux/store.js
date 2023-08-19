import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlide';
import userReducer from './slices/userSlide';
import productReducer from './slices/productSlide';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['product', 'user'],
};

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
