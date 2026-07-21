export function renderUser({
  user,
  userName,
  loginStatus,
  loginBtn,
  logoutBtn,
}) {
  // Display username
  userName.textContent = user.name || 'None'

  // Display login status
  loginStatus.textContent = user.loggedIn ? 'Logged In' : 'Logged Out'

  // Disable buttons appropriately
  loginBtn.disabled = user.loggedIn
  logoutBtn.disabled = !user.loggedIn
}
