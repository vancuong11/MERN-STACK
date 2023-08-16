import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlide';
import productReducer from './slices/productSlide';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        product: productReducer,
    },
});
