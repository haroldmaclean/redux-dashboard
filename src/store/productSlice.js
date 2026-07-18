import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',

  async () => {
    const response = await fetch('https://dummyjson.com/products')

    const data = await response.json()

    return data.products
  },
)

const productSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default productSlice.reducer
