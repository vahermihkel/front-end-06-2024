import { useEffect, useMemo, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { Category } from '../../models/Category';
import useFetchProducts from '../../util/useFetchProducts';
// import producstJSON from "../../data/products.json";

function EditProduct() {
	const { qnr } = useParams();
	const {products, loading} = useFetchProducts();

	const product = useMemo(() => products.find(p => p.id === Number(qnr)), [products, qnr]); // kasuta find()
	const idRef = useRef<HTMLInputElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	const activeRef = useRef<HTMLInputElement>(null);
	const rateRef = useRef<HTMLInputElement>(null);
	const countRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const [isUnique, setIsUnique] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);

	const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;
	const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;

	useEffect(() => {
		if (categoriesDbUrl === undefined) {
			return;
		}
		fetch(categoriesDbUrl)
			.then(res => res.json())
			.then(json => setCategories(json || []));
	}, [categoriesDbUrl]);	

	// Reacti hookid - Reacti erikood
	// 1. Peavad algama use eesliidesega
	// 2. Neid peab alati importima
	// 3. Neid peab alati käivitama
	// 4. Need ei tohi olla funktsiooni sees loodud
	// 5. Need ei tohi olla loodud tingimuslikult

	const edit = () => {
		if (titleRef.current === null || idRef.current === null ||
	descRef.current === null || priceRef.current === null || imageRef.current === null ||
	categoryRef.current === null || rateRef.current === null || 
	activeRef.current === null || countRef.current === null) {
			return;
		}
		const changedproduct = {
			"id": Number(idRef.current.value),
			"title": titleRef.current.value,
			"category": categoryRef.current.value,
			"price": Number(priceRef.current.value),
			"image": imageRef.current.value,
			"description": descRef.current.value,
			"active": activeRef.current.checked,
			"rating": {
				"rate": Number(rateRef.current.value),
				"count": Number(countRef.current.value)
			}
		}
		const index = products.findIndex(p => p.id === Number(qnr));
		products[index] = changedproduct;
		if (productsDbUrl === undefined) {
			return;
		}
		fetch(productsDbUrl, {method: "PUT", body: JSON.stringify(products)})
			.then(() => navigate("/admin/maintain-products"));
	}

	const checkIdUniquness = () => {
		const idInput = idRef.current;
		if (idInput === null) {
			return;
		}
		if (qnr === idInput.value) {
			setIsUnique(true);
			return;
		}

		const result = products.findIndex(p => p.id === Number(idInput.value));
		// -1 --> ei leitud    0,1,2,3,4  --> leiti
		if (result === -1) {
			setIsUnique(true);
		} else {
			setIsUnique(false);
		}
	}

	if (loading) {
		return <Spinner />
	}

	if (product === undefined) {
		return <div>product not fount</div>
	}

	return (
		<div>
			{isUnique === false && <div>Product ID is not Unique!</div>}
			<h3>{product.title}</h3>
			<label htmlFor="">Product rating & count</label> <br />
			<input ref={rateRef} type="number" disabled defaultValue={product.rating.rate} />
			<input ref={countRef} type="number" disabled defaultValue={product.rating.count} /> <br />
			<label htmlFor="">Product id</label> <br />
			<input onChange={checkIdUniquness} ref={idRef} type="number" defaultValue={product.id} /><br />
			<label htmlFor="">Product title</label> <br />
			<input ref={titleRef} type="text" defaultValue={product.title} /><br />
			<label htmlFor="">Product description</label> <br />
			<textarea style={{width: "500px"}} ref={descRef} defaultValue={product.description} /><br />
			<label htmlFor="">Product category</label> <br />
			{/* <input ref={categoryRef} type="text" defaultValue={product.category} /><br /> */}
			<select ref={categoryRef} defaultValue={product.category} >
				{categories.map(category => <option key={category.name}>{category.name}</option>)}
			</select> <br />
			<label htmlFor="">Product price</label> <br />
			<input ref={priceRef} type="number" defaultValue={product.price} /><br />
			<label htmlFor="">Product image</label> <br />
			<input ref={imageRef} type="text" defaultValue={product.image} /><br />
			<label htmlFor="">Product stock</label> <br />
			<input ref={activeRef} type="checkbox" defaultChecked={product.active} /><br />
			<button disabled={isUnique === false} onClick={edit}>Update</button>
		</div>
	)
}

export default EditProduct