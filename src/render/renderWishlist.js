export function renderWishlist({
  wishlist,
  wishlistItems,
  emptyWishlistMessage,
}) {
  // Clear previous UI
  wishlistItems.innerHTML = ''

  // Empty state
  if (wishlist.items.length === 0) {
    emptyWishlistMessage.style.display = 'block'
    return
  }

  // Hide message when items exist
  emptyWishlistMessage.style.display = 'none'

  // Render products
  wishlist.items.forEach((product) => {
    const li = document.createElement('li')

    li.innerHTML = `
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        width="60"
      >

      <div>
        <strong>${product.title}</strong>

        <p>$${product.price}</p>

        <small>⭐ ${product.rating}</small>
      </div>

      <button
        class="remove-wishlist-btn"
        data-id="${product.id}"
      >
        Remove
      </button>
    `

    wishlistItems.appendChild(li)
  })
}
