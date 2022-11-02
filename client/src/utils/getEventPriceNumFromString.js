export default function getEventPriceNumFromString(priceStr) {
  const isNaNPrice = isNaN(parseFloat(priceStr));
  const numPrice = isNaNPrice ? 0 : parseFloat(priceStr);
  return numPrice;
}
