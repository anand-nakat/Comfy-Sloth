export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (products, name) => {
  let items = products.map((product) => product[name]);
  if (name === "colors") {
    items = items.flat();
  }
  items = ["all", ...new Set(items)];
  return items;
};
