// import { CartProduct } from "../models/CartProduct";
import { CartProduct } from "../models/CartProduct";
import { CartProductId } from "../models/CartProductId";
import { Product, Rating } from "../models/Product";

export const calculateCart = (cart: CartProduct[]) => {
  let cartSum = 0;
  cart.forEach(p => 
    cartSum += p.product.price * p.quantity
  );
  return cartSum;
}

export const countProducts = (cart: CartProduct[]) => {
  let cartCount = 0;
  cart.forEach(product =>
    cartCount += product.quantity
  );
  return cartCount;
}

export const getCartWithProducts = (cartLS: CartProductId[], products: Product[]) => {
  return cartLS.map(c => (
    {
      quantity: c.quantity, 
      product: products.find(p => p.id === c.productId) || 
          new Product(0, "", 0, "", "", "", false, new Rating(0,0))
    }
  ));
}