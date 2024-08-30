import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div>
			<img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="" />
			<h1>404 - Page not found!</h1>
			<Link to="/">
				<p>Back to home</p>
			</Link>
		</div>
	)
}

export default NotFound