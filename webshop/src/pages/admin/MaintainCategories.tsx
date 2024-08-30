import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Category } from '../../models/Category';

function MaintainCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const categoryRef = useRef<HTMLInputElement>(null);
	const url = process.env.REACT_APP_CATEGORIES_DB_URL;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (url === undefined) {
			return;
		} 
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setCategories(json || []);
				setLoading(false);
			});
	}, [url]);	

	const deleteCategory = (index: number) => {
		categories.splice(index,1);
		setCategories(categories.slice());
		if (url === undefined) {
			return;
		} 
		fetch(url, {method: "PUT", body: JSON.stringify(categories)});
	}

	const add = () => {
		if (url === undefined || categoryRef.current === null) {
			return;
		} 
		categories.push({"name": categoryRef.current.value});
		setCategories(categories.slice());
		fetch(url, {method: "PUT", body: JSON.stringify(categories)});
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<label>Category name</label> <br />
			<input ref={categoryRef} type="text" /> <br />
			<button onClick={add}>Add</button>
			<div>
				{categories.map((category, index) => 
					<div key={category.name}>
						{category.name}
						<button onClick={() => deleteCategory(index)}>x</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default MaintainCategories