// utils/filterProducts.js

export function filterProducts(products, searchTerm, selectedCategory, sortBy) {
  // Search
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm)
  })

  // Category
  const categoryFilteredProducts = filteredProducts.filter((product) => {
    if (selectedCategory === 'all') {
      return true
    }

    return product.category === selectedCategory
  })

  // Copy array before sorting
  const sortedProducts = [...categoryFilteredProducts]

  // Sort
  switch (sortBy) {
    case 'price-low-high':
      sortedProducts.sort((a, b) => a.price - b.price)
      break

    case 'price-high-low':
      sortedProducts.sort((a, b) => b.price - a.price)
      break

    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating)
      break

    case 'stock':
      sortedProducts.sort((a, b) => b.stock - a.stock)
      break

    case 'name-a-z':
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
      break

    case 'name-z-a':
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
      break

    default:
      break
  }

  return sortedProducts
}
