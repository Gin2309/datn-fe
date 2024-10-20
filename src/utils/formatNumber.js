export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount);
};

export const formatNumber = (number) => {
  if (number === undefined || number === null) return "";

  const numStr = number.toString();
  const [integerPart] = numStr.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedInteger;
};
