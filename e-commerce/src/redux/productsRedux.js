import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            category ?
                `localhost:5000/api/products/?category=${category}`
                :
                'http://localhost:5000/api/products');

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
        isFetching: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isFetching = true;
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isFetching = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload;
            })
    }
});

export const {  } = productSlice.actions;
export default productSlice.reducer;