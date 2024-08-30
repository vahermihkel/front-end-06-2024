import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartSumContext } from '../../store/CartSumContext';
import { useDispatch } from 'react-redux';
import { increment } from '../../store/counterSlice';
import { Product as ProductModel } from '../../models/Product';
import { CartProductId } from '../../models/CartProductId';

function Product({product}: {product: ProductModel}) {
  const {cartSum, setCartSum} = useContext(CartSumContext);
  const dispatch = useDispatch();

  const addToCart = (productClicked: ProductModel) => {
		// cartJSON.push(product);
		const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
		const index = cartLS.findIndex(p => p.productId === productClicked.id);
		if (index >= 0) { // index !== -1
			cartLS[index].quantity++;
		} else {
			cartLS.push({quantity: 1, productId: productClicked.id});
		}
		
		localStorage.setItem("cart", JSON.stringify(cartLS));
		toast.success(productClicked.title + ' - added to cart' );
		// react-hot-toast
    setCartSum(cartSum + productClicked.price);
    dispatch(increment());
	}

  return (
    <div className="product">
      <img style={{ width: "100px", height: "100px" }} src={product.image} alt="" />
      <div>{product.title.length > 50 ? product.title.substring(0,50) + "..." : product.title}</div>
      <div>€{product.price}</div>
      <button onClick={() => addToCart(product)}>Add to cart</button> <br />
      <Link to={"/product/" + product.title.toLowerCase().replaceAll(" ", "-")}>
        <button>Read more</button>
      </Link>
    </div>
  )
}

export default Product