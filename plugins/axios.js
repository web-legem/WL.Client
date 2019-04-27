export default function (ctx) {
    ctx.$axios.onRequest((config) => {
        config.headers.common['Authorization'] = getToken(ctx)
    })
}

function getToken(ctx) {
    let credential = ctx.app.$cookies.get('credential');
    if (credential && credential.token) {
        return credential.token;
    } else {
        return "none";
    }
}