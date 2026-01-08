// 1. FUNCTION CHECK PRICE
export const resolveVariantPrice = (variant, product) => {
  if (!product || !product.priceProduct) {
    throw new Error("Product hoặc priceProduct không hợp lệ");
  }

  if (variant && variant.price !== null && variant.price !== undefined) {
    return variant.price;
  }

  return product.priceProduct;
};

//  2 . FUNCTION CALULATE CART
export const calculateCartItemPrice = (variant, product, quantity = 1) => {
  const price = resolveVariantPrice(variant, product);

  if (quantity < 1) {
    throw new Error("Số lượng không hợp lệ không < 1");
  }
  return price * quantity;
};

//  3. FUNCTION CALCULATE ALL CART
export const calculateCartItemsPrice = (cartItems = []) => {
  return cartItems.reduce((total, item) => {
    const { variant, product, quantity } = item;
    return total + calculateCartItemPrice(variant, product, quantity);
  });
};
