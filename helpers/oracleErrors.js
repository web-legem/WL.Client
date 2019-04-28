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
    'SUPERAK':'Documento',

    'ENT':'Entidades',
    'ENTTYP':'Tipo Entidades',
    'DOCTYP':'Tipo Documentos',
    'ANOTYP':'Tipo Anotacion',
    'DOC':'Documentos',
    'DS':'Documentos Soportados',
    'ANO':'Anotaciones',
    'USR':'Usarios'
  }

  let typeDic = {
    'ValidEmail':'Error: Correo no valido.<br/>Campo: $campo',
    'EmptyField':'Error: No se permite contenido vacio.<br/>Campo: $campo',
    'NullValue':'Error: No se permite valores nulos o vacios.<br/>Campo: $campo',
    'EmptyArray':'Error: Es obligatorio completar alguna selección.<br/>Campo: $campo',
    'MaxLength':'Error: Se ha excedido la longitud maxima del campo.<br/>Campo: $campo',
    'InvalidId':'Error: No se econtro una petición valida.<br/>Campo: $campo',
    'DateMustHavePassed':'Error: La fecha debe ser menor.<br/>Campo: $campo',
    'DateMustBeAfter':'Error: La fecha debe ser mayor.<br/>Campo: $campo',
    
    'NotFound':'No se encontro el registro',
    'uniqueConstraintViolated':'Error: Ya existe un registro con los mismos datos<br/>Campo: $campo',
    'IntegrityConstraintViolated':'Error: Existen "$campo" asociados a este registro.',
  }

  if(Array.isArray(data)){
    data = data[0];
  }  

  let type = data.errorType;
  let field = data.fieldNames;
  let msg = data.message;
  if(type && field){
    type = typeDic[type];
    if(type){
      field = fieldDic[field];
      if(field){
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