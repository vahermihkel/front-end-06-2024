import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';

function SignUp() {
	const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmc_2cOIyKxXw2AJSBh9FVkUXqQbKqr2c";
	const emailRef = useRef();
	const passwordRef = useRef();
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const {setLoggedIn} = useContext(AuthContext);

	const signup = (event) => {
		event.preventDefault();

		const payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
			returnSecureToken: true
		}
		fetch(url, {method: "POST", body: JSON.stringify(payload), headers: {"Content-Type": "application/json"}})
			.then(res => res.json())
			.then(json => {
				// console.log(json.error.message);
				if (json.error === undefined) {
					setMessage("");
					navigate("/admin");
					sessionStorage.setItem("idToken", json.idToken);
					sessionStorage.setItem("refreshToken", json.refreshToken);
					setLoggedIn(true);
				} else {
					setMessage(json.error.message);
				}
			})
	}

	return (
		<div className='signup-form'>
			<h1>Sign up</h1>
			<div style={{color: "red", backgroundColor: "pink", borderRadius: "10px"}}>{message}</div>
			<Form onSubmit={signup}>
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control ref={emailRef} type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control ref={passwordRef} type="password" placeholder="Password" />
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" controlId="formGridAddress1">
					<Form.Label>Address</Form.Label>
					<Form.Control placeholder="1234 Main St" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formGridAddress2">
					<Form.Label>Address 2</Form.Label>
					<Form.Control placeholder="Apartment, studio, or floor" />
				</Form.Group>

				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>City</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridState">
						<Form.Label>State</Form.Label>
						<Form.Select defaultValue="Choose...">
							<option>Choose...</option>
							<option>...</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridZip">
						<Form.Label>Zip</Form.Label>
						<Form.Control />
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" id="formGridCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default SignUp;