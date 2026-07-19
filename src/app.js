import { store } from './store/store.js'

import { fetchProducts } from './store/productSlice.js'

import {
  increment,
  decrement,
  reset,
  increaseByAmount,
} from './store/counterSlice.js'

import { logIn, logout } from './store/userSlice.js'

// 🟢 STEP 1: Import your fresh wishlist reducer
import {
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
} from './store/wishlistSlice.js'

import { addItem, clearCart } from './store/cartSlice.js'

// 🟢 NEW IMPORT FOR SPRINT 1 REFACOR:
import { renderProducts } from './render/renderProducts.js'

import { filterProducts } from './utils/filterProducts.js'

/* ===============================
   DOM ELEMENTS
================================= */

const countValue = document.getElementById('count-value')

const incrementBtn = document.getElementById('increment-btn')
const decrementBtn = document.getElementById('decrement-btn')
const resetBtn = document.getElementById('reset-btn')

const amountInput = document.getElementById('amount-input')
const increaseBtn = document.getElementById('increase-btn')

const usernameInput = document.getElementById('username-input')
const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')

const userName = document.getElementById('user-name')
const loginStatus = document.getElementById('login-status')

const cartCount = document.getElementById('cart-count')
const cartTotal = document.getElementById('cart-total')
const addLaptopBtn = document.getElementById('add-laptop-btn')
const addMouseBtn = document.getElementById('add-mouse-btn')
const clearCartBtn = document.getElementById('clear-cart-btn')

const emptyCartMessage = document.getElementById('empty-cart-message')

const cartItems = document.getElementById('cart-items')

const loadingMessage = document.getElementById('loading-message')

const errorMessage = document.getElementById('error-message')

const wishlistItems = document.getElementById('wishlist-items')

const emptyWishlistMessage = document.getElementById('empty-wishlist-message')

const productList = document.getElementById('product-list')

const reduxState = document.getElementById('redux-state')

// FEATURE 6 — TARGET THE LOADING SPINNER
const spinner = document.getElementById('loading-spinner')

// FEATURE 7 — TARGET THE SEARCH INPUT
const searchInput = document.getElementById('search-input')

// FEATURE 8 — CATEGORY FILTER SELECT Cache Element
const categoryFilter = document.getElementById('category-filter')

// FEATURE 9 — SORT PRODUCTS SELECT Cache Element
const sortProducts = document.getElementById('sort-products')

/* ===============================
   RENDER FUNCTION
================================= */

function render() {
  const state = store.getState()

  const searchTerm = searchInput.value.toLowerCase()

  const selectedCategory = categoryFilter.value

  // 🟢 FIX 1: Define sortBy by grabbing the value from your DOM cache element
  const sortBy = sortProducts.value

  //FEATURE 8 — BUILD CATEGORY LIST (PROFESSIONAL OPTIMIZED)
  const categories = (state.products.products || []).map((product) => {
    return product.category
  })
  const uniqueCategories = [...new Set(categories)]

  // Only rebuild the dropdown options if the counts don't match (prevents screen flash/lag)
  if (
    categoryFilter &&
    categoryFilter.options.length !== uniqueCategories.length + 1
  ) {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'

    uniqueCategories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1)
      categoryFilter.appendChild(option)
    })

    // Maintain the user's active selection state after rebuilding options
    categoryFilter.value = selectedCategory
  }

  cartCount.textContent = state.cart.items.length

  const totalPrice = state.cart.items.reduce((total, item) => {
    return total + item.price
  }, 0)

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`

  // Counter
  countValue.textContent = state.counter.value

  // User
  userName.textContent = state.user.name || 'None'

  loginStatus.textContent = state.user.loggedIn ? 'Logged In' : 'Logged Out'

  loginBtn.disabled = state.user.loggedIn

  logoutBtn.disabled = !state.user.loggedIn

  // Cart
  cartItems.innerHTML = ''

  if (state.cart.items.length === 0) {
    emptyCartMessage.style.display = 'block'
  } else {
    emptyCartMessage.style.display = 'none'
  }

  state.cart.items.forEach((item) => {
    const li = document.createElement('li')

    li.textContent = `${item.name} - $${item.price}`

    cartItems.appendChild(li)
  })

  /* ===============================================================
     ✨ WISHLIST FEATURE INTEGRATION ✨
     Integrated ChatGPT UI loop directly into the global template layout engine
  ================================================================= */
  wishlistItems.innerHTML = ''

  // Show or hide the empty message
  if (state.wishlist.items.length === 0) {
    emptyWishlistMessage.style.display = 'block'
  } else {
    emptyWishlistMessage.style.display = 'none'
  }

  // Loop through the wishlist slice state and generate dynamic grid cards
  state.wishlist.items.forEach((product) => {
    const li = document.createElement('li')
    li.classList.add('wishlist-card')

    li.innerHTML = `
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="wishlist-image"
      >
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button
        class="remove-wishlist-btn"
        data-id="${product.id}"
      >
        Remove
      </button>
    `
    wishlistItems.appendChild(li)
  })

  // FEATURE 6 — LOADING SPINNER STATE TOGGLE
  if (spinner) {
    spinner.style.display = state.products.loading ? 'block' : 'none'
  }

  // PRODUCTS
  loadingMessage.textContent = state.products.loading ? 'loading...' : ''

  errorMessage.textContent = state.products.error || ''
  // PRODUCTS LIST
  productList.innerHTML = ''

  // Replaced Refactored filterProducts
  const sortedProducts = filterProducts(
    state.products.products || [], // 🟢 FIX 2: Add '|| []' fallback safety guard so it won't crash while loading
    searchTerm,
    selectedCategory,
    sortBy,
  )

  // 4. CHECK IF FILTERED PRODUCTS IS EMPTY (RESTORED TO ORIGINAL LOCATION)
  // if (filteredProducts.length === 0)

  /* ❌ CHANGE THIS OLD LINE:
if (categoryFilteredProducts.length === 0)*/
  if (sortedProducts.length === 0) {
    productList.innerHTML = `
    <li class="no-products">
      🔍 No products found.
    </li>
  `
    return
  }

  // =================================================================
  // ✂️ MOVED OUT PART: The old sortedProducts.forEach loop was removed from here!
  // 🟢 NEW IMPLEMENTATION: We delegate product rendering to our new module
  // =================================================================
  renderProducts(sortedProducts, productList, state.wishlist.items)

  //   Redux State Viewer
  reduxState.textContent = JSON.stringify(state, null, 2)
}

/* ===============================
   SUBSCRIBE
================================= */

store.subscribe(render)

/* ===============================
   INITIAL RENDER
================================= */

render()

// Test our first async thunk
store.dispatch(fetchProducts())

/* ===============================
   COUNTER EVENTS
================================= */
searchInput.addEventListener('input', () => {
  render()
})

sortProducts.addEventListener('change', () => {
  render()
})

// 🟢 FIXED: Added missing Category filter event listener exactly where your partner specified!
categoryFilter.addEventListener('change', () => {
  render()
})

incrementBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

decrementBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

resetBtn.addEventListener('click', () => {
  store.dispatch(reset())
})

increaseBtn.addEventListener('click', () => {
  const value = amountInput.value.trim()

  if (value === '') {
    alert('Please enter a number.')
    return
  }

  const amount = Number(value)

  if (Number.isNaN(amount)) {
    alert('Please enter a valid number.')
  }

  if (amount <= 0) {
    alert('Please enter a number greater than zero.')
    return
  }

  store.dispatch(increaseByAmount(amount))

  amountInput.value = ''
})
// increaseBtn.addEventListener('click', () => {
//   const amount = Number(amountInput.value)

//   if (!Number.isNaN(amount)) {
//     store.dispatch(increaseByAmount(amount))

//     amountInput.value = ''
//   }
// })

/* ===============================
   USER EVENTS
================================= */

loginBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim()

  if (name) {
    store.dispatch(logIn(name))

    usernameInput.value = ''
  }
})

logoutBtn.addEventListener('click', () => {
  store.dispatch(logout())
})

/* ===============================
   CART EVENTS
================================= */

addLaptopBtn.addEventListener('click', () => {
  store.dispatch(
    addItem({
      id: 1,
      name: 'Laptop',
      price: 999.99,
    }),
  )
})

addMouseBtn.addEventListener('click', () => {
  store.dispatch(
    addItem({
      id: 2,
      name: 'Mouse',
      price: 49.99,
    }),
  )
})

clearCartBtn.addEventListener('click', () => {
  store.dispatch(clearCart())
})

// 🟢 UPDATED PRODUCT LIST LISTENER (WITH WISHLIST TOGGLE)
productList.addEventListener('click', (event) => {
  // 1. WISHLIST TOGGLE INTERCEPTOR (Partner's Logic)
  if (event.target.classList.contains('wishlist-btn')) {
    const productId = Number(event.target.dataset.id)
    const state = store.getState()

    // Look inside the wishlist items state first
    const existingItem = state.wishlist.items.find((item) => {
      return item.id === productId
    })

    if (existingItem) {
      // Condition A: If it's already there, take it out
      store.dispatch(removeWishlistItem(productId))
    } else {
      // Condition B: If it's not there, find it in your products list and add it
      const product = state.products.products.find((product) => {
        return product.id === productId
      })

      if (product) {
        store.dispatch(addWishlistItem(product))
      }
    }
    return // Stop execution here since we handled the wishlist click
  }

  // 2. EXISTING DYNAMIC ADD TO CART INTERCEPTOR
  if (event.target.classList.contains('add-product-btn')) {
    const productId = Number(event.target.dataset.id)
    const state = store.getState()

    const product = state.products.products.find((product) => {
      return product.id === productId
    })

    if (product) {
      store.dispatch(
        addItem({
          id: product.id,
          name: product.title,
          price: product.price,
        }),
      )
    }
  }
})

/* ===============================================================
   WISHLIST PANEL REMOVE EVENT DELEGATION 
================================================================= */
wishlistItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-wishlist-btn')) {
    const productId = Number(event.target.dataset.id)
    store.dispatch(removeWishlistItem(productId))
  }
})

//  ORIGINAL FILE
// import { store } from './store/store.js'

// import { fetchProducts } from './store/productSlice.js'

// import {
//   increment,
//   decrement,
//   reset,
//   increaseByAmount,
// } from './store/counterSlice.js'

// import { logIn, logout } from './store/userSlice.js'

// // 🟢 STEP 1: Import your fresh wishlist reducer
// import {
//   addWishlistItem,
//   removeWishlistItem,
//   clearWishlist,
// } from './store/wishlistSlice.js'

// import { addItem, clearCart } from './store/cartSlice.js'

// // 🟢 NEW IMPORT FOR SPRINT 1 REFACOR:
// import { renderProducts } from './render/renderProducts.js'

// /* ===============================
//    DOM ELEMENTS
// ================================= */

// const countValue = document.getElementById('count-value')

// const incrementBtn = document.getElementById('increment-btn')
// const decrementBtn = document.getElementById('decrement-btn')
// const resetBtn = document.getElementById('reset-btn')

// const amountInput = document.getElementById('amount-input')
// const increaseBtn = document.getElementById('increase-btn')

// const usernameInput = document.getElementById('username-input')
// const loginBtn = document.getElementById('login-btn')
// const logoutBtn = document.getElementById('logout-btn')

// const userName = document.getElementById('user-name')
// const loginStatus = document.getElementById('login-status')

// const cartCount = document.getElementById('cart-count')
// const cartTotal = document.getElementById('cart-total')
// const addLaptopBtn = document.getElementById('add-laptop-btn')
// const addMouseBtn = document.getElementById('add-mouse-btn')
// const clearCartBtn = document.getElementById('clear-cart-btn')

// const emptyCartMessage = document.getElementById('empty-cart-message')

// const cartItems = document.getElementById('cart-items')

// const loadingMessage = document.getElementById('loading-message')

// const errorMessage = document.getElementById('error-message')

// const wishlistItems = document.getElementById('wishlist-items')

// const emptyWishlistMessage = document.getElementById('empty-wishlist-message')

// const productList = document.getElementById('product-list')

// const reduxState = document.getElementById('redux-state')

// // FEATURE 6 — TARGET THE LOADING SPINNER
// const spinner = document.getElementById('loading-spinner')

// // FEATURE 7 — TARGET THE SEARCH INPUT
// const searchInput = document.getElementById('search-input')

// // FEATURE 8 — CATEGORY FILTER SELECT Cache Element
// const categoryFilter = document.getElementById('category-filter')

// // FEATURE 9 — SORT PRODUCTS SELECT Cache Element
// const sortProducts = document.getElementById('sort-products')

// /* ===============================
//    RENDER FUNCTION
// ================================= */

// function render() {
//   const state = store.getState()

//   const searchTerm = searchInput.value.toLowerCase()

//   const selectedCategory = categoryFilter.value

//   //FEATURE 8 — BUILD CATEGORY LIST (PROFESSIONAL OPTIMIZED)
//   const categories = (state.products.products || []).map((product) => {
//     return product.category
//   })
//   const uniqueCategories = [...new Set(categories)]

//   // Only rebuild the dropdown options if the counts don't match (prevents screen flash/lag)
//   if (
//     categoryFilter &&
//     categoryFilter.options.length !== uniqueCategories.length + 1
//   ) {
//     categoryFilter.innerHTML = '<option value="all">All Categories</option>'

//     uniqueCategories.forEach((category) => {
//       const option = document.createElement('option')
//       option.value = category
//       option.textContent = category.charAt(0).toUpperCase() + category.slice(1)
//       categoryFilter.appendChild(option)
//     })

//     // Maintain the user's active selection state after rebuilding options
//     categoryFilter.value = selectedCategory
//   }

//   cartCount.textContent = state.cart.items.length

//   const totalPrice = state.cart.items.reduce((total, item) => {
//     return total + item.price
//   }, 0)

//   cartTotal.textContent = `$${totalPrice.toFixed(2)}`

//   // Counter
//   countValue.textContent = state.counter.value

//   // User
//   userName.textContent = state.user.name || 'None'

//   loginStatus.textContent = state.user.loggedIn ? 'Logged In' : 'Logged Out'

//   loginBtn.disabled = state.user.loggedIn

//   logoutBtn.disabled = !state.user.loggedIn

//   // Cart
//   cartItems.innerHTML = ''

//   if (state.cart.items.length === 0) {
//     emptyCartMessage.style.display = 'block'
//   } else {
//     emptyCartMessage.style.display = 'none'
//   }

//   state.cart.items.forEach((item) => {
//     const li = document.createElement('li')

//     li.textContent = `${item.name} - $${item.price}`

//     cartItems.appendChild(li)
//   })

//   /* ===============================================================
//       ✨ WISHLIST FEATURE INTEGRATION ✨
//       Integrated ChatGPT UI loop directly into the global template layout engine
//   ================================================================= */
//   wishlistItems.innerHTML = ''

//   // Show or hide the empty message
//   if (state.wishlist.items.length === 0) {
//     emptyWishlistMessage.style.display = 'block'
//   } else {
//     emptyWishlistMessage.style.display = 'none'
//   }

//   // Loop through the wishlist slice state and generate dynamic grid cards
//   state.wishlist.items.forEach((product) => {
//     const li = document.createElement('li')
//     li.classList.add('wishlist-card')

//     li.innerHTML = `
//       <img
//         src="${product.thumbnail}"
//         alt="${product.title}"
//         class="wishlist-image"
//       >
//       <h3>${product.title}</h3>
//       <p>$${product.price}</p>
//       <p>⭐ ${product.rating}</p>
//       <button
//         class="remove-wishlist-btn"
//         data-id="${product.id}"
//       >
//         Remove
//       </button>
//     `
//     wishlistItems.appendChild(li)
//   })

//   // FEATURE 6 — LOADING SPINNER STATE TOGGLE
//   if (spinner) {
//     spinner.style.display = state.products.loading ? 'block' : 'none'
//   }

//   // PRODUCTS
//   loadingMessage.textContent = state.products.loading ? 'loading...' : ''

//   errorMessage.textContent = state.products.error || ''
//   // PRODUCTS LIST
//   productList.innerHTML = ''

//   const filteredProducts = state.products.products.filter((product) => {
//     return product.title.toLowerCase().includes(searchTerm)
//   })

//   const categoryFilteredProducts = filteredProducts.filter((product) => {
//     if (selectedCategory === 'all') {
//       return true
//     }

//     return product.category === selectedCategory
//   })

//   const sortedProducts = [...categoryFilteredProducts]

//   const sortBy = sortProducts.value

//   // 3. EXECUTE THE SWITCH ENGINE
//   switch (sortBy) {
//     case 'price-low-high':
//       sortedProducts.sort((a, b) => a.price - b.price)
//       break
//     case 'price-high-low':
//       sortedProducts.sort((a, b) => b.price - a.price)
//       break
//     case 'rating':
//       sortedProducts.sort((a, b) => b.rating - a.rating)
//       break
//     case 'stock':
//       sortedProducts.sort((a, b) => b.stock - a.stock)
//       break
//     case 'name-a-z':
//       sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
//       break
//     case 'name-z-a':
//       sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
//       break
//     default:
//       break
//   }

//   // 4. CHECK IF FILTERED PRODUCTS IS EMPTY (RESTORED TO ORIGINAL LOCATION)
//   if (categoryFilteredProducts.length === 0) {
//     productList.innerHTML = `
//     <li class="no-products">
//       🔍 No products found.
//     </li>
//   `
//     return
//   }

//   // =================================================================
//   // ✂️ MOVED OUT PART: The old sortedProducts.forEach loop was removed from here!
//   // 🟢 NEW IMPLEMENTATION: We delegate product rendering to our new module
//   // =================================================================
//   renderProducts(sortedProducts, productList, state.wishlist.items)

//   // Redux State Viewer
//   reduxState.textContent = JSON.stringify(state, null, 2)
// }

// /* ===============================
//    SUBSCRIBE
// ================================= */

// store.subscribe(render)

// /* ===============================
//    INITIAL RENDER
// ================================= */

// render()

// // Test our first async thunk
// store.dispatch(fetchProducts())

// /* ===============================
//    COUNTER EVENTS
// ================================= */
// searchInput.addEventListener('input', () => {
//   render()
// })

// sortProducts.addEventListener('change', () => {
//   render()
// })

// // 🟢 FIXED: Added missing Category filter event listener exactly where your partner specified!
// categoryFilter.addEventListener('change', () => {
//   render()
// })

// incrementBtn.addEventListener('click', () => {
//   store.dispatch(increment())
// })

// decrementBtn.addEventListener('click', () => {
//   store.dispatch(decrement())
// })

// resetBtn.addEventListener('click', () => {
//   store.dispatch(reset())
// })

// increaseBtn.addEventListener('click', () => {
//   const value = amountInput.value.trim()

//   if (value === '') {
//     alert('Please enter a number.')
//     return
//   }

//   const amount = Number(value)

//   if (Number.isNaN(amount)) {
//     alert('Please enter a valid number.')
//   }

//   if (amount <= 0) {
//     alert('Please enter a number greater than zero.')
//     return
//   }

//   store.dispatch(increaseByAmount(amount))

//   amountInput.value = ''
// })

// /* ===============================
//    USER EVENTS
// ================================= */

// loginBtn.addEventListener('click', () => {
//   const name = usernameInput.value.trim()

//   if (name) {
//     store.dispatch(logIn(name))

//     usernameInput.value = ''
//   }
// })

// logoutBtn.addEventListener('click', () => {
//   store.dispatch(logout())
// })

// /* ===============================
//    CART EVENTS
// ================================= */

// addLaptopBtn.addEventListener('click', () => {
//   store.dispatch(
//     addItem({
//       id: 1,
//       name: 'Laptop',
//       price: 999.99,
//     }),
//   )
// })

// addMouseBtn.addEventListener('click', () => {
//   store.dispatch(
//     addItem({
//       id: 2,
//       name: 'Mouse',
//       price: 49.99,
//     }),
//   )
// })

// clearCartBtn.addEventListener('click', () => {
//   store.dispatch(clearCart())
// })

// // 🟢 UPDATED PRODUCT LIST LISTENER (WITH WISHLIST TOGGLE)
// productList.addEventListener('click', (event) => {
//   // 1. WISHLIST TOGGLE INTERCEPTOR (Partner's Logic)
//   if (event.target.classList.contains('wishlist-btn')) {
//     const productId = Number(event.target.dataset.id)
//     const state = store.getState()

//     // Look inside the wishlist items state first
//     const existingItem = state.wishlist.items.find((item) => {
//       return item.id === productId
//     })

//     if (existingItem) {
//       // Condition A: If it's already there, take it out
//       store.dispatch(removeWishlistItem(productId))
//     } else {
//       // Condition B: If it's not there, find it in your products list and add it
//       const product = state.products.products.find((product) => {
//         return product.id === productId
//       })

//       if (product) {
//         store.dispatch(addWishlistItem(product))
//       }
//     }
//     return // Stop execution here since we handled the wishlist click
//   }

//   // 2. EXISTING DYNAMIC ADD TO CART INTERCEPTOR
//   if (event.target.classList.contains('add-product-btn')) {
//     const productId = Number(event.target.dataset.id)
//     const state = store.getState()

//     const product = state.products.products.find((product) => {
//       return product.id === productId
//     })

//     if (product) {
//       store.dispatch(
//         addItem({
//           id: product.id,
//           name: product.title,
//           price: product.price,
//         }),
//       )
//     }
//   }
// })

// /* ===============================================================
//    WISHLIST PANEL REMOVE EVENT DELEGATION
// ================================================================= */
// wishlistItems.addEventListener('click', (event) => {
//   if (event.target.classList.contains('remove-wishlist-btn')) {
//     const productId = Number(event.target.dataset.id)
//     store.dispatch(removeWishlistItem(productId))
//   }
// })
