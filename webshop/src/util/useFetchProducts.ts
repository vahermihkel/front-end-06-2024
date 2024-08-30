import { useEffect, useState } from 'react'
import { Product } from '../models/Product';

function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
	const [productsDefault, setProductsDefault] = useState<Product[]>([]);
	const url = process.env.REACT_APP_PRODUCTS_DB_URL;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (url === undefined) {
			return;
		}
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setProducts(json || []);
				setProductsDefault(json || []);
				setLoading(false);
			})
	}, [url]);

  return {products, productsDefault, loading, setProducts, url};
}

export default useFetchProducts