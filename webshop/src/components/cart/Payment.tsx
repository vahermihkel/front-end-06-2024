import React from 'react'

interface PaymentInterface {
	sum: number
}

function Payment(props: PaymentInterface) {

  const pay = () => {
		const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
		const paymentBody = {
			"account_name": "EUR3D1",
			"nonce": "165dejk" + new Date() + Math.random() * 9999999,
			"timestamp": new Date(),
			"amount": props.sum,
			"order_reference": Math.random() * 9999999,
			"customer_url": "https://webshop-06-2024.web.app",
			"api_username": "92ddcfab96e34a5f"
		};
		const paymentHeaders = {
			"Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
			"Content-Type": "application/json"
		};

		fetch(url, {
			method: "POST", 
			body: JSON.stringify(paymentBody), 
			headers: paymentHeaders
		}).then(res => res.json())
			.then(body => window.location.href = body.payment_link);
	}

	// HTMLs URLi vahetada: <Link to="avaleht">
	// JSs URLi vahetada: const navigate = useNavigate()     navigate("/halda");
	// rakenduse väline URLi vahetus: window.location.href = "http://google.com"


  return (
    <button onClick={pay}>Pay</button>
  )
}

export default Payment