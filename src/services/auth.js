function authUser() {
    const user = localStorage.getItem('@authUser')
    if (user) {
        return true
    } else {
        return false
    }
}

export const isAuthenticated = () => authUser();
