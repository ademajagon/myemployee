export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  // Add your token validation logic here (e.g., decode token, check expiration)
  return !!token; // Basic check: return true if token exists
};
