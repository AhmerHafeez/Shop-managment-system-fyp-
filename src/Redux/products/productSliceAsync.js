/*** This component is actually not used in the application, However I have kept here just for learning purpose */
// https://hemanthkollanur.medium.com/react-fetch-data-with-redux-toolkit-using-createasyncthunk-tutorial-eeb4e817477e

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// Define the async thunk for fetching user data
export const fetchProductssData = createAsyncThunk('product/fetchProductssData', async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow'
    });
    
    const jsonData = await response.json();
    
    if (!response.ok) {
        // If the response is not ok, handle the error
        console.error('Error fetching products:', jsonData.message || 'Unknown error');
        throw new Error(jsonData.message || 'Failed to fetch products');
    }
    
    return jsonData;
});

const initialState = {
    allProducts: [],
    loading: false, 
    error: null
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductssData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductssData.fulfilled, (state, action) => {
            state.loading = false;
            state.allProducts = action.payload;
          })
          .addCase(fetchProductssData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

// export const { fetchProductData } = productSlice.actions

export default productSlice.reducer