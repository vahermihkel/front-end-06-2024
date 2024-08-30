import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Book } from '../../models/Book';

function BookSupplier() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState("react");
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.itbook.store/1.0/search/" + searchValue)
      .then(res => res.json())
      .then(json => {
        setBooks(json.books);
        setLoading(false);
      });
  }, [searchValue]);

  const changeSearchValue = () => {
    if (searchRef.current === null) {
      return;
    }
    if (searchRef.current.value.length === 0) {
      return;
    }
    setSearchValue(searchRef.current.value);
  }

  if (loading) {
		return <Spinner />
	}

  return (
    <div>
      <input onChange={changeSearchValue} ref={searchRef} defaultValue={"react"} type="text" />
      {searchValue.length >= 2 ?
       <table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Image</th>
						<th>Title</th>
						<th>Subtitle</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{books.map(p =>
						<tr key={p.isbn13}>
							<td>{p.isbn13}</td> 
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.subtitle}</td>
							<td>{p.price}</td>
						</tr>
					)}
				</tbody>
			</table> :
        <div>Invalid search!</div>
      }
    </div>
  )
}

export default BookSupplier