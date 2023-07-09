import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX} from "../../const.js";

const initialState = {
    category: [],
    error: '',
    activeCategory: 0,
};

export const categoryAsyncRequest = createAsyncThunk('category/fetch', () => {
    fetch(`${API_URI}${POSTFIX}/category`)
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
    extraReducers: {
        [categoryAsyncRequest.pending.type]: (state) => {
            state.error = '';
        },
        [categoryAsyncRequest.fulfilled.type]: (state, action) => {
            state.error = '';
            state.category = action.payload;
        },
        [categoryAsyncRequest.rejected.type]: (state, action) => {
            state.error = action.payload.error;
        }
    }
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;