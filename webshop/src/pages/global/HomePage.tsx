import { Spinner } from 'react-bootstrap';
// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import SortButtons from '../../components/home/SortButtons';
import FilterButtons from '../../components/home/FilterButtons';
import Product from '../../components/home/Product';
import CarouselGallery from '../../components/home/CarouselGallery';
import useFetchProducts from '../../util/useFetchProducts';

function HomePage() {
	const {products, productsDefault, loading, setProducts} = useFetchProducts();

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Home</h1>
			<CarouselGallery />
			<SortButtons products={products} setProducts={setProducts} />
			<FilterButtons productsDefault={productsDefault} setProducts={setProducts} />
			<br /><br />
			<h6>There are currently {products.length} products found</h6>
			<div className="products">
				{products.map(product =>
					<Product key={product.id} product={product} />
				)}
			</div>
		</div>
	)
}

export default HomePage