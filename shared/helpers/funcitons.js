// NUMBER FUNCTIONS
export const formatAmount = (amount) => Number(amount).toFixed(2);

// COLOR FUNCTIONS
export const lightenColor = (color, amount) => {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`);
};

const addLight = (color, amount) => {
  let cc = parseInt(color, 16) + amount;
  let c = cc > 255 ? 255 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};
