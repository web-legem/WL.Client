export default function data(code){
  let dic = {
    'WL_1_NTD':  ORA1('Nombre Tipo Documento'),
    'WL_1_NTE':  ORA1('Nombre Tipo Entidad'),
    'WL_1_NE':   ORA1('Nombre Entidad'),
    'WL_1_NRA':  ORA1('Nombre Raiz de la Anotación'),
    'WL_1_NA':   ORA1('Nombre Anotación'),
    'WL_6512_E':'WL_6512_E',
    'WL_6512_DOC':'WL_6512_DOC',
    'WL_6512_DOC':'WL_6512_DOC',
    'WL_6512_TE':'WL_6512_TE',
    'WL_6512_TE':'WL_6512_TE',
    '':'',
  }
  let result = dic[code.toString()];
  return result ? result :"Error en la base de datos, contacte al administrador"
}

function ORA1(campo){
  let msg = "Ya existe un registro con los mismos datos\nCampo: $campo";
  return msg.replace("$campo",campo);
}