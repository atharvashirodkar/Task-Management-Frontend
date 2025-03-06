// Helper function to get the token from localStorage

export const getAuthToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : null;
  };
  
  export const createAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };