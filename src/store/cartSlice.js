import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload

      const exists = state.items.some((item) => {
        return item.id === product.id
      })

      if (!exists) {
        state.items.push(product)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
