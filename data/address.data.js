import addressData from "./address.json";

const data = Object.entries(addressData);

export const departamentos = data.map((d) => {
  return {
    departamento: d[0],
    provincias: Object.entries(d[1]).map((provincia) => {
      return {
        provincia: provincia[0],
        distritos: Object.keys(provincia[1]),
      };
    }),
  };
});

export const provincias = departamentos.reduce((acc, dep) => {
  return [...acc, ...dep.provincias].sort((a, b) => a.provincia.localeCompare(b.provincia));
}, []);
