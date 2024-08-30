import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import useFetchProducts from '../../util/useFetchProducts';
// import productsJSON from '../../data/products.json'

function SingleProduct() {
	const { title } = useParams();
	const {products, loading} = useFetchProducts();
	const product = products.find(p => p.title.toLowerCase().replaceAll(" ", "-") === title);

	if (loading) {
		return <Spinner />
	}

	if (product === undefined) {
		return <h1>Product not found!</h1>
	}

	return (
		<div className='single-product'>
			<h1>Product name: {product.title}</h1>
			<p>Category: {product.category}</p>
			<img src={product.image} alt="" />
			<p>Product price: {product.price}</p>
			<p>Product descriptions: {product.description}</p>
			<p>Product rating: {product.rating.rate} ({product.rating.count})</p>
		</div>
	)
}

export default SingleProduct