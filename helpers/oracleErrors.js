export default function data(data){
  let fieldDic = {
    'TA_NAME':'Nombre Tipo Anotación',
    'TA_ROOT':'Nombre Raiz Anotación',
    'TD_NAME':'Nombre Tipo Documento',
    'E_NAME':'Nombre Entidad',
    'E_EMAIL':'Email',
    'E_TEID':'Tipo Entidad',
    'TE_NAME':'Nombre Tipo Entidad',
    'TE_DSID':'Documentos Soportados',
    'U_FIRSTNAME':'Nombre',
    'U_LASTNAME':'Apellido',
    'U_DOCUMENT':'Documento',
    'U_NICKNAME':'Usuario',
    'U_PASSWORD':'Contraseña',
    'U_EMAIL':'Email',
    'U_ROLEID':'Rol',
    'ROLE_NAME':'Nombre de Rol',
    'E':'Entidades',
    'TE':'Tipo Entidades',
    'TD':'Tipo Documentos',
    'DOC':'Documentos',
    'DS':'Documentos Soportados',
  }

  let typeDic = {
    'ValidEmail':'Error: Correo no valido.\nCampo: $campo',
    'EmptyField':'Error: No se permite contenido vacio.\nCampo: $campo',
    'NullValue':'Error: No se permite valores nulos o vacios.\nCampo: $campo',
    'EmptyArray':'Error: Es obligatorio completar alguna selección.\nCampo: $campo',
    'MaxLength':'Error: Se ha excedido la longitud maxima del campo.\nCampo: $campo',
    'InvalidId':'Error: No se econtro una petición valida.\nCampo: $campo',
    'DateMustHavePassed':'Error: La fecha debe ser menor.\nCampo: $campo',
    'DateMustBeAfter':'Error: La fecha debe ser mayor.\nCampo: $campo',
    'ORA1':'Error: Ya existe un registro con los mismos datos<br/>Campo: $campo',
    'ORA6512':'Error: Existen "$campo" asociados a este registro.',
  }

  if(Array.isArray(data)){
    console.log("xxx1");
    data = data[0];
  }  

  let type = data.errorType;
  let field = data.fieldNames;
  let msg = data.message;
  console.log("xxxx2");
  if(type && field){
    console.log("xxxx3");
    type = typeDic[type];
    console.log("xxxx4");
    if(type){
      console.log("xxxx5");
      field = fieldDic[field];
      if(field){
        console.log("xxxx6");
        return type.replace("$campo",field);
      }
      return "Error en la base de datos, contacte al administrador"
    }  
  }

  if(msg){
    return msg;
  }
  
  return "Error en la base de datos, contacte al administrador [1]";
}