import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.promotion > 0
                ? action.payload.discountPrice * action.payload.quantity
                : action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                state.total -= product.promotion > 0 ?
                    product.discountPrice * product.quantity :
                    product.price * product.quantity;
                state.products = state.products.filter(p => p._id !== action.payload);
                state.quantity -= 1;

            }
        },
        increaseQuantity: (state, action) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.quantity += 1;
                state.total += product.promotion > 0 ? product.discountPrice : product.price;
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product && product.quantity > 0) {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                    state.total -= product.promotion > 0 ? product.discountPrice : product.price;
                } else {
                    state.products = state.products.filter(p => p._id !== action.payload);
                    state.total -= product.promotion > 0 ?
                        product.discountPrice * product.quantity :
                        product.price * product.quantity;
                    state.quantity -= 1;
                }
            }
        }
    }
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;