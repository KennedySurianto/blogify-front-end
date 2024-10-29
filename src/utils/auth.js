
export const authEvent = new Event("authChange");

export const isAuthenticated = () => !!localStorage.getItem("token");

export const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.dispatchEvent(authEvent); // Notify listeners of login
};

export const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(authEvent); // Notify listeners of logout
};
