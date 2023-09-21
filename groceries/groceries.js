import { products } from "./data.js";

const shoppingList1 = [
  { product: "potatoes", kgOrdered: 25 },
  { product: "rice", kgOrdered: 53 },
  { product: "plums", kgOrdered: 1 },
  { product: "pumpkin", kgOrdered: 13 },
  { product: "nectarines", kgOrdered: 6 },
];

const season = "winter";

export function shoppingCalculator(list, season) {
  // calculate stock availability
  const inStock = list.map((listItem) => ({
    ...listItem,
    kgSupplied: !products[listItem.product].seasons.includes(season)
      ? 0
      : products[listItem.product].qty >= listItem.kgOrdered
        ? listItem.kgOrdered
        : products[listItem.product].qty,
  }));
  // calculate price per product
  const invoiceLines = inStock.map((listItem) => ({
    ...listItem,
    lineTotal: listItem.kgSupplied * products[listItem.product].price,
  }));
  // calculate subtotal
  const subtotal = invoiceLines.reduce(
    (subTotal, item) => subTotal + item.lineTotal,
    0
  );
  // determine if shipping is free
  const shipping = subtotal > 200 ? 0.0 : 15.0;
  // calculate total
  const total = subtotal + shipping;
  //create invoice
  console.table(
    [
      ...invoiceLines,
      { product: "shipping", lineTotal: shipping },
      { product: "total", lineTotal: total },
    ].map((lineItem) => ({
      ...lineItem,
      lineTotal: lineItem.lineTotal.toFixed(2),
    }))
  );
}

shoppingCalculator(shoppingList1, season);
