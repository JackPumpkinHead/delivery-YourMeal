import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const.js";

const initialState = {
    category: [],
    error: '',
    activeCategory: 0,
};

export const categoryAsyncRequest = createAsyncThunk('category/fetch', () => {
    return fetch(`${API_URI}${POSTFIX}/category`)
        .then(req => req.json())
        .catch(error => ({ error }))
})

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory(state, action) {
            state.activeCategory = action.payload.indexCategory
        }
    },
    extraReducers: builder => {
        builder
            .addCase(categoryAsyncRequest.pending, state => {
                state.error = ''
            })
            .addCase(categoryAsyncRequest.fulfilled, (state, action) => {
                state.error = '';
                state.category = action.payload;
            })
            .addCase(categoryAsyncRequest.rejected, (state, action) => {
                state.error = action.payload.error;
            })
    }
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;