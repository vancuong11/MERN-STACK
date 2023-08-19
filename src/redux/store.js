import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlide';
import userReducer from './slices/userSlide';
import productReducer from './slices/productSlide';
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        order: orderReducer,
    },
});
