export function authHeader() {
    // return authorization header with jwt token
    let credential = JSON.parse(localStorage.getItem('credential'));

    if (credential && credential.token) {
        return { 'Authorization': 'Bearer ' + credential.token };
    } else {
        return {};
    }
}