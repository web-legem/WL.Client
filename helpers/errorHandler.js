import { throwError } from "rxjs";

export default function errorHandler(ex) {
  
  let exception ={
    client: "CLIENT_EXCEPTION",
    oracle: "ORACLE_EXCEPTION",
    credential: "ERROR_CREDENTIAL",    
  }
  let error = new Error();

  if (ex.response) {
    if (ex.response.data && ex.response.data.message) {
      console.log("xxx1",ex.response.data.message);
      return "Error desconocido 0"
    } else {
      console.log("xxx2",ex.response);
      return "Error desconocido 1"
    }
  } else {
    //mostrar solamente si es debug
    error.name = exception.client;
    error.message = true ? ex.message : "Recarge la pagina, si el problema persiste contacte con el administrador";
    return error;
  }

}
