import oracle from '../helpers/oracleErrors'

export default function errorHandler(ex) {

  let exception = {
    client: "CLIENT_EXCEPTION",
    oracle: "ORACLE_EXCEPTION",
    credential: "ERROR_CREDENTIAL",
  }
  let error = new Error();

  if (ex.response) {    
    if (ex.response.data) {
      error.name = exception.oracle;
      if(ex.response.status == 400){
        error.message = oracle(ex.response.data);
      }else{
        if(ex.extra){
          ex.response.data.extra = ex.extra
        }
        error.message = oracle(ex.response.data);
      }
      return error;
    } else {
      const code = parseInt(ex.response && ex.response.status)

      if(code){
        switch (code) {
          case 401:
            return new Error("Lo sentimos, pero usted no esta autorizado para acceder a esta pagina")            
          case 404:
            return new Error("Lo sentimos, no encontró la pagina solicitada")          
        }
      }
      error.message = ex.response
      return error;
    }
  } else {
    if (ex.message != undefined && ex.message.startsWith("WL")) {
      error.name = 'WLError';
      switch (ex.message) {
        case "WL_NotFound":
          error.message = "No se encontro el registro"
          break;
        default:
          'Default Message';
      }
      return error;
    } else {
      //mostrar solamente si es debug    
      error.message = true ? ex.message : "Recarge la pagina, si el problema persiste contacte con el administrador";
      return error;
    }
  }
}
