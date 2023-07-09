import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const.js";

const initialState = {
    products: [],
    error: '',
};

export const productAsyncRequest = createAsyncThunk('product/fetch', (category) => {
    return fetch(`${API_URI}${POSTFIX}?category=${category}`)
        .then(req => req.json())
        .catch(error => ({ error }))
})


const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(productAsyncRequest.pending, state => {
                state.error = ''
            })
            .addCase(productAsyncRequest.fulfilled, (state, action) => {
                state.error = '';
                state.products = action.payload;
            })
            .addCase(productAsyncRequest.rejected, (state, action) => {
                state.error = action.payload.error;
            })
    }
});

export default productSlice.reducer;