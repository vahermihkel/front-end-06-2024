import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { calculateCart, getCartWithProducts } from '../util/calculations';
import { CartProductId } from '../models/CartProductId';
import useFetchProducts from '../util/useFetchProducts';

// Create a Context for the app
export const CartSumContext = createContext(
	{
		cartSum: 0,
		setCartSum: (value: number) => { }
	}
);

// Create a provider component
export const CartSumProvider = ({ children }: PropsWithChildren) => {
  // State that will be shared in the context
  const {products} = useFetchProducts();
  const [cartSum, setCartSum] = useState(0);

  useEffect(() => {
    const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartWithProducts = getCartWithProducts(cartLS, products);
    setCartSum(calculateCart(cartWithProducts));
  }, [products])

  return (
    <CartSumContext.Provider value={{ cartSum, setCartSum }}>
      {children}
    </CartSumContext.Provider>
  );
};

