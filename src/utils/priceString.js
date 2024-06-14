export const priceString = (price, option) =>
  price &&
  "₦ " +
  parseInt(price)?.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    ...option,
  });
