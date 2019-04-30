export default function (ctx) {
  ctx.$axios.onRequest((config) => {
    config.headers.common['Authorization'] = getToken(ctx)
  })

  ctx.$axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // if (code === 401) {      
    //   ctx.redirect('/unauthorized')
    // }
  })

}

function getToken(ctx) {
  let credential = ctx.app.$cookies.get('credential');
  if (credential && credential.token) {
    return credential.token;
  } else {
    return "";
  }
}