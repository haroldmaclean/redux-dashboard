export function populateCategories({
  products,
  categoryFilter,
  selectedCategory,
}) {
  // Build category list
  const categories = (products || []).map((product) => {
    return product.category
  })

  // Remove duplicates
  const uniqueCategories = [...new Set(categories)]

  // Prevent rebuilding every render
  if (
    categoryFilter &&
    categoryFilter.options.length !== uniqueCategories.length + 1
  ) {
    // Reset dropdown
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'

    // Build category options
    uniqueCategories.forEach((category) => {
      const option = document.createElement('option')

      option.value = category

      option.textContent = category.charAt(0).toUpperCase() + category.slice(1)

      categoryFilter.appendChild(option)
    })

    // Restore user's selection
    categoryFilter.value = selectedCategory
  }
}
