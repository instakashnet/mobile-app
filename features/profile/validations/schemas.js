import * as Yup from "yup";

export const addProfileSchema = Yup.object().shape({
  ruc: Yup.string()
    .required("Debes colocar un RUC.")
    .matches(/^[0-9]{10,11}$/, "Debe ser de entre 10 y 11 caracteres. Solo números."),
  razon_social: Yup.string().required("Debes colocar la razón social de la empresa."),
  address: Yup.string().required("Debes agregar la dirección fiscal de la empresa."),
  accept: Yup.boolean().oneOf([true], "Debes aceptar la delcaración de información."),
});
