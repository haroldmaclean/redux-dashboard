import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterSlice.js'
import userReducer from './userSlice.js'
import cartReducer from './cartSlice.js'
import productReducer from './productSlice'
import wishlistReducer from './wishlistSlice.js'

import loggerMiddleware from '../middleware/loggerMiddleware.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})
