export default function authHeader() {
    // return authorization header with jwt token
    let credential = JSON.parse(localStorage.getItem('credential'));

    if (credential && credential.token) {
        console.log("xxxx1",credential.token);
        return credential.token ;
    } else {
        console.log("xxxx2", "none");
        return "none";
    }
}