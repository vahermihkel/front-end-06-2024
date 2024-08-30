import React, { useRef, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Picture } from '../../models/Picture';
 
function MaintainPictures() {
	const [loading, setLoading] = useState(true);
	const [pictures, setPictures] = useState<Picture[]>([]);
	const urlRef = useRef<HTMLInputElement>(null);
	const altRef = useRef<HTMLInputElement>(null);
	const textRef = useRef<HTMLInputElement>(null);
	const headerRef = useRef<HTMLInputElement>(null);
	const pictureDbUrl = process.env.REACT_APP_PICTURES_DB_URL;
 
	useEffect(() => {
		if (pictureDbUrl === undefined) {
			return;
		}
		fetch(pictureDbUrl)
			.then(res => res.json())
			.then(json => {
				setPictures(json || [])
				setLoading(false)
			}
			);
	}, [pictureDbUrl]);
 
	const deletePicture = (index: number) => {
		if (pictureDbUrl === undefined) {
			return;
		}
		pictures.splice(index, 1);
		setPictures(pictures.slice());
		fetch(pictureDbUrl, { method: "PUT", body: JSON.stringify(pictures) });
	}
 
	const addPicture = () => {
		if (urlRef.current === null || altRef.current === null ||
			headerRef.current === null || textRef.current === null) {
			return;
		}
		const newPicture = {
			//"id": 0,
			"url": urlRef.current.value,
			"alt": altRef.current.value,
			"header": headerRef.current.value,
			"text": textRef.current.value
		};
		pictures.push(newPicture);
		if (pictureDbUrl === undefined) {
			return;
		}
		setPictures(pictures.slice());
		fetch(pictureDbUrl, { method: "PUT", body: JSON.stringify(pictures) });
	}
 
	if (loading) {
		return <Spinner />
	}
 
	return (
		<div>
			<label>Picture url</label> <br />
			<input ref={urlRef} type="text" /> <br />
			<label>Picture alt</label> <br />
			<input ref={altRef} type="text" /> <br />
			<label>Picture header</label> <br />
			<input ref={headerRef} type="text" /> <br />
			<label>Picture text</label> <br />
			<input ref={textRef} type="textarea" /> <br />
			<button onClick={addPicture}>Add new picture</button>
			<div>
				{pictures.map((picture, index) =>
					<div key={index}>
						<h5>{picture.header}</h5>
						<p>{picture.text}</p>
						<img src={picture.url} alt={picture.alt} />
						<button onClick={() => deletePicture(index)}>x</button>
					</div>
				)}
			</div>
		</div>
	)
}
 
export default MaintainPictures
