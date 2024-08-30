import React, { useEffect, useState } from 'react'
// import { Spinner } from 'react-bootstrap';
import Payment from '../../components/cart/Payment';
import { fetchData } from '../../util/services';

// https://fakestoreapi.com/products
function Supplier() {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

// componentDidMount
// componentWillMount

// tehakse 1x useEffect sisu kui lehele tullakse
  useEffect(() => {
    // fetch('https://fakestoreapi.com/products')
    //   .then(response => response.json()) // kogu tagastus -> statuscode, headers
    fetchData() 
		.then(json => {
				setProducts(json);
				setLoading(false);
			}) // reaalne sisu mille lehelt saan
  }, []);
  // dependency array -> sinna panen muutujad mille muutudes läheb
  //                      useEffect uuesti käima

	if (loading) {
		return <div>Loading...</div>
	}

  return (
    <div>
			<Payment sum={200} />
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Rating</th>
						<th>Image</th>
						<th>Title</th>
						<th>Category</th>
						<th>Description</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p, index) =>
						<tr key={p.id}>
							<td>{p.id}</td> 
							<td>{p.rating.rate}/{p.rating.count}</td> 
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.description}</td>
							<td>{p.price}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
  )
}

export default Supplier