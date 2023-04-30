const TOKEN = 'token';

export const LocalStore = {
    setToken: (token: string) => {
        localStorage.setItem(TOKEN, token);
    },
    getToken: () => {
        return localStorage.getItem(TOKEN) || null;
    }
}
