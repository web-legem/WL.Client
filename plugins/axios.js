
export default function ({ $axios }) {     
  $axios.onRequest((config) => {
    config.headers.common['Authorization'] = getToken()
  })  
}

function getToken(){
  let credential = JSON.parse(localStorage.getItem('credential'));
  if (credential && credential.token) {
    return credential.token ;
  } else {
    return "none";
  }
}