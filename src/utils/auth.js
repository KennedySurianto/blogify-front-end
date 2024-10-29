
export const authEvent = new Event("authChange");

export const isAuthenticated = () => !!localStorage.getItem("token");

export const login = (token) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(authEvent); // Notify listeners of login
};

export const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(authEvent); // Notify listeners of logout
};
