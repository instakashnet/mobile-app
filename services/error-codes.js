const codes = [
  // AUTH
  { message: "Ya existe una cuenta con el correo colocado.", code: 2001 },
  { message: "No se ha encontrado una cuenta con el correo colocado.", code: 2002 },
  { message: "Ya existe una cuenta con el teléfono colocado.", code: 2003 },
  { message: "El correo y/o contraseña colocados son incorrectos.", code: 2004 },
  { message: "El RUC que intentas agregar ya se encuentra registrado.", code: 2006 },
  { message: "No tienes permiso para acceder a la plataforma. Debes contactar a soporte.", code: 2008 },
  { message: "El código de afiliado ingresado no existe.", code: 2010 },
  { message: "El código de verificación colocado es inválido.", code: 2016 },
  // EXCHANGE
  { message: "Debes esperar al menos 2 minutos para crear un nuevo pedido.", code: 4001 },
  { message: "En estos momentos no estamos aceptando nuevos pedidos.", code: 4002 },
  { message: "Este cupón no está permitido usar para este pedido.", code: 4003 },
  { message: "Esta pedido ya ha expirado, deberás crear un nuevo pedido.", code: 4004 },
  { message: "Debes seleccionar el origen de tus fondos.", code: 4005 },
  { message: "El nro. de operación que intentas ingresar ya ha sido utilizado en otro pedido.", code: 4007 },
];

export const getErrorMessage = (code) => {
  let message = "Parece que ha ocurrido un error inesperado. Por favor intenta de nuevo.";
  const errorFound = codes.find((c) => code === c.code);
  if (errorFound) message = errorFound.message;

  return message;
};
