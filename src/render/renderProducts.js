export function renderProducts(products, productList, wishlistItems) {
  productList.innerHTML = ''

  products.forEach((product) => {
    const li = document.createElement('li')

    li.classList.add('product-card')

    const isWishlisted = wishlistItems.find((item) => {
      return item.id === product.id
    })

    li.innerHTML = `
      <div class="product-card-header">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-image"
        >

        <button
          class="wishlist-btn"
          data-id="${product.id}"
        >
          ${isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <h3>${product.title}</h3>

      <p><strong>Price:</strong> $${product.price}</p>

      <p><strong>Rating:</strong> ⭐ ${product.rating}</p>

      <p><strong>Category:</strong> ${product.category}</p>

      <button
        class="add-product-btn"
        data-id="${product.id}"
      >
        Add To Cart
      </button>
    `

    productList.appendChild(li)
  })
}
