export function renderCart({
  cart,
  cartCount,
  cartTotal,
  cartItems,
  emptyCartMessage,
}) {
  // Update cart count
  cartCount.textContent = cart.items.length

  // Calculate total
  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.price
  }, 0)

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`

  // Clear previous items
  cartItems.innerHTML = ''

  // Empty cart message
  if (cart.items.length === 0) {
    emptyCartMessage.style.display = 'block'
  } else {
    emptyCartMessage.style.display = 'none'
  }

  // Render items
  cart.items.forEach((item) => {
    const li = document.createElement('li')

    li.textContent = `${item.name} - $${item.price}`

    cartItems.appendChild(li)
  })
}
