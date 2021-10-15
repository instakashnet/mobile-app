const codes = [
  {
    message: "Ya existe una cuenta con el correo colocado.",
    code: 2001,
  },
  {
    message: "No se ha encontrado una cuenta con el correo colocado.",
    code: 2002,
  },
  {
    message: "Ya existe una cuenta con el teléfono colocado.",
    code: 2003,
  },
  {
    message: "El correo y/o contraseña colocados son incorrectos.",
    code: 2004,
  },
  {
    message: "El RUC que intentas agregar ya se encuentra registrado.",
    code: 2006,
  },
  {
    message: "No tienes permiso para acceder a la plataforma. Debes contactar a soporte.",
    code: 2008,
  },
  {
    message: "El código de afiliado ingresado no existe.",
    code: 2010,
  },
  {
    message: "El código de verificación colocado es inválido.",
    code: 2016,
  },
];

export const getErrorMessage = (code) => {
  let message = "Parece que ha ocurrido un error inesperado. Por favor intenta de nuevo.";
  const errorFound = codes.find((c) => code === c.code);
  if (errorFound) message = errorFound.message;

  return message;
};
