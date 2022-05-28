import * as Yup from "yup";

export const addProfileSchema = Yup.object().shape({
  ruc: Yup.string()
    .required("Debes colocar un RUC.")
    .matches(/^[0-9]{10,11}$/, "Debe ser de entre 10 y 11 caracteres. Solo números."),
  razon_social: Yup.string().required("Debes colocar la razón social de la empresa."),
  address: Yup.string().required("Debes agregar la dirección fiscal de la empresa."),
  accept: Yup.boolean().oneOf([true], "Debes aceptar la delcaración de información."),
});

export const editAdditionalsSchema = Yup.object().shape({
  job: Yup.string().required("Debes colocar tu ocupación."),
  profession: Yup.string().required("Debes colocar tu profesión."),
  date_birth: Yup.date().required("Debes colocar tu fecha de nacimiento."),
  address: Yup.string().required("Debes colocar tu dirección."),
});
