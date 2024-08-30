import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Category } from '../../models/Category';
import useFetchProducts from '../../util/useFetchProducts';
// import productsJSON from '../../data/products.json';

function AddProduct() {
	// const [message, setMessage] = useState("Add product!");
	const idRef = useRef<HTMLInputElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	const ratingRef = useRef<HTMLInputElement>(null);
	const activeRef = useRef<HTMLInputElement>(null);
	const [isUnique, setIsUnique] = useState<boolean>(true);
	const [categories, setCategories] = useState<Category[]>([]);
	const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;
	const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
	const {products} = useFetchProducts();

	useEffect(() => {
		if (categoriesDbUrl === undefined) {
			return;
		}
		fetch(categoriesDbUrl)
			.then(res => res.json())
			.then(json => setCategories(json || []));
	}, [categoriesDbUrl]);	

	const add = () => {
		if (!checkImage() || titleRef.current === null || idRef.current === null ||
	descRef.current === null || priceRef.current === null || imageRef.current === null ||
	categoryRef.current === null || ratingRef.current === null || activeRef.current === null) {
			return;
		}
		if (titleRef.current.value === "") {
			toast.error("Can't add product without a title!");
			return;
		}
		if (titleRef.current.value.length < 4) {
			toast.error("Product name too short!");
			return;
		}
		if (titleRef.current.value[0] === titleRef.current.value[0].toLowerCase()) {
			toast.error("Product can't start with a lower case letter or a number!");
			return;
		}
		toast.success("Product added: " + titleRef.current.value);

		const newProduct = {
			'id': Number(idRef.current.value),
			'title': titleRef.current.value,
			'description': descRef.current.value,
			'price': Number(priceRef.current.value),
			'image': imageRef.current.value,
			'category': categoryRef.current.value,
			'rating': {
				'rate': Number(ratingRef.current.value),
				'count': 0
			},
			'active': activeRef.current.checked
		}

		products.push(newProduct);

		if (productsDbUrl === undefined) {
			return;
		}
		fetch(productsDbUrl, {method: "PUT", body: JSON.stringify(products)})
			.then(() => {
				if (titleRef.current === null || idRef.current === null ||
					descRef.current === null || priceRef.current === null || 
					imageRef.current === null || categoryRef.current === null || 
					ratingRef.current === null || activeRef.current === null) {
					return;
				}
				idRef.current.value = "";
				titleRef.current.value = "";
				descRef.current.value = "";
				priceRef.current.value = "";
				imageRef.current.value = "";
				categoryRef.current.value = "";
				ratingRef.current.value = "";
				activeRef.current.checked = false;
			});
	}

	const checkImage = () => {
		if (imageRef.current === null) {
			return;
		}
		if (imageRef.current.value.startsWith("https://") === false) {
			toast.error("Image URL is wrong!");
			return false;
		}
		if (!(imageRef.current.value.endsWith(".png") ||
			imageRef.current.value.endsWith(".jpg") ||
			imageRef.current.value.endsWith(".jpeg"))) {
			toast.error("Image URL ending is wrong!");
			return false;
		}
		return true;
	}

	const checkIdUniquness = () => {
		const idInput = idRef.current;
		if (idInput === null) {
			return;
		}
		const result = products.findIndex(p => p.id === Number(idInput.value));
		if (result === -1) {
			setIsUnique(true);
		} else {
			setIsUnique(false);
		}
	}

	return (
		<div>
			{isUnique === false && <div>Product ID is not Unique!</div>}
			<h1>Add a new product</h1>
			<label>Product id</label> <br />
			<input onChange={checkIdUniquness} ref={idRef} type="number" /> <br />
			<label>Product name</label> <br />
			<input ref={titleRef} type="text" /> <br />
			<label>Product description</label> <br />
			<textarea ref={descRef} /> <br />
			<label>Product price</label> <br />
			<input ref={priceRef} type="number" /> <br />
			<label>Product category</label> <br />
			{/* <input ref={categoryRef} type="text" /> <br /> */}
			<select ref={categoryRef}>
				{categories.map(category => <option key={category.name}>{category.name}</option>)}
			</select> <br />
			<label>Product rating</label> <br />
			<input ref={ratingRef} type="number" max="5" min="0" step=".1" /> <br />
			<label>Product image</label> <br />
			<input ref={imageRef} type="text" /> <br />
			<label>Product in stock</label> <br />
			<input ref={activeRef} type="checkbox" /> <br />
			<button disabled={isUnique === false} onClick={add}>Add</button> <br />
		</div>
	)
}

export default AddProduct