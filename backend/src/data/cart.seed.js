// backend/src/data/cart.seed.js

export const generateSampleCarts = (users, variants) => {
  // Tạo giỏ hàng cho mỗi người dùng hiện có
  return users.map((user) => {
    // Mỗi user sẽ có từ 1 đến 2 sản phẩm ngẫu nhiên trong giỏ
    const numberOfItems = Math.floor(Math.random() * 2) + 1;
    const cartItems = [];

    // Lấy ngẫu nhiên các biến thể
    const shuffledVariants = [...variants].sort(() => 0.5 - Math.random());
    const selectedVariants = shuffledVariants.slice(0, numberOfItems);

    selectedVariants.forEach((variant) => {
      cartItems.push({
        product: variant.productId,
        variant: variant._id,
        qty: Math.floor(Math.random() * 3) + 1, // Số lượng từ 1-3
      });
    });

    return {
      userId: user._id,
      cartItems: cartItems,
    };
  });
};
