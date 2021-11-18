import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Debes colocar tu correo.").email("Debes colocar un correo válido."),
  password: Yup.string().required("Debes colocar tu contraseña."),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().required("Debes colocar un correo."),
  phone: Yup.string().required("Debes colocar un teléfono."),
  password: Yup.string()
    .required("Debes colocar tu contraseña.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Tu contraseña debe tener una mayúscula, una minúscula y un número. Al menos 6 caracteres."),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir."),
  affiliate: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z0-9]+$/i, "El código de afiliado contiene solo letras y números."),
  acceptTerms: Yup.boolean().oneOf([true], "Debes aceptar nuestros términos y condiciones."),
});

export const completeProfileSchema = Yup.object().shape({
  document_type: Yup.string().required("Debes seleccionar tu tipo de documento."),
  document_identification: Yup.string()
    .required("Debes colocar tu nro. de documento.")
    .matches(/^[0-9]{8,11}$/, "El nro. de documento colocado es incorrecto."),
  first_name: Yup.string().required("Debes escribir tus nombres."),
  last_name: Yup.string().required("Debes escribir tus apellidos."),
  identity_sex: Yup.string().required("Debes seleccionar una opción."),
});
