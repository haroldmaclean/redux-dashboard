export function registerEventListeners({
  render,
  searchInput,
  sortProducts,
  categoryFilter,
}) {
  // Search
  searchInput.addEventListener('input', () => {
    render()
  })

  // Sort
  sortProducts.addEventListener('change', () => {
    render()
  })

  // Category
  categoryFilter.addEventListener('change', () => {
    render()
  })
}
