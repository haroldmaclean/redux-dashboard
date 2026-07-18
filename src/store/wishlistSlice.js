import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',

  initialState,

  reducers: {
    addWishlistItem(state, action) {
      const existingItem = state.items.find((item) => {
        return item.id === action.payload.id
      })

      if (!existingItem) {
        state.items.push(action.payload)
      }
    },

    removeWishlistItem(state, action) {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload
      })
    },

    clearWishlist(state) {
      state.items = []
    },
  },
})

export const { addWishlistItem, removeWishlistItem, clearWishlist } =
  wishlistSlice.actions

export default wishlistSlice.reducer
