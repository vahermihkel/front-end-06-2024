import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmc_2cOIyKxXw2AJSBh9FVkUXqQbKqr2c";
	const emailRef = useRef();
	const passwordRef = useRef();
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const {setLoggedIn} = useContext(AuthContext);

	const login = (event) => {
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
		<div className='login-form'>
			<h1>Login</h1>
			<div style={{color: "red", backgroundColor: "pink", borderRadius: "10px"}}>{message}</div>
			<Form onSubmit={login}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control ref={emailRef} type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control ref={passwordRef} type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
  );
}

export default Login;