import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist', // Fixed the name to remove extra space
    initialState: {
        products: []
    },
    reducers: {
        addToWishlist: (state, action) => {
            const productExists = state.products.find(p => p._id === action.payload._id);

            if (!productExists) {
                state.products.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload._id);
        }
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
