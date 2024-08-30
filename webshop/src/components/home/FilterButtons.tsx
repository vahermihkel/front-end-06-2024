import { useRef } from 'react'
import { Product } from '../../models/Product';

interface FilterButtonsInterface {
	productsDefault: Product[],
	setProducts: (products: Product[]) => void
}

function FilterButtons(props: FilterButtonsInterface) {
  const searchedRef = useRef<HTMLSelectElement>(null);

  const filterByCategory = () => {
    const searchValue = searchedRef.current;
    if (searchValue === null) {
      return;
    }
		const result = props.productsDefault.filter(products =>
			products.category.toLowerCase().includes(searchValue.value.toLowerCase())
		);
		props.setProducts(result);
	}

	const categoryOptions = [...new Set(props.productsDefault.map((p) => p.category))];

  return (
    <div>
      <h6>Filter by category:</h6>

      <select defaultValue="" onChange={filterByCategory} ref={searchedRef}>
        <option value="">--Select category--</option>
        {categoryOptions.map((category) => 
          <option key={category}>{category}</option> //reset filter?
        )}
      </select>
    </div>
  )
}

export default FilterButtons