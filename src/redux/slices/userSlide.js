import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    isAdmin: false,
    city: '',
    refresh_token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                phone = '',
                address = '',
                avatar = '',
                access_token = '',
                _id = '',
                isAdmin,
                city,
                refresh_token = '',
            } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.city = city;
            state.refresh_token = refresh_token;
        },

        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state._id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
            state.refresh_token = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
