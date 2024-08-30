import React, { SyntheticEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export const ContactUs = () => {
	const form = useRef<HTMLFormElement>(null);

	const sendEmail = (e: SyntheticEvent) => {
		e.preventDefault();

		if (form.current === null)  {
			return;
		}

		emailjs
			.sendForm('service_4kqtz04', 'template_blapspn', form.current, {
				publicKey: '92wTREyCsK8B3_N8K',
			})
			.then(
				() => {
					console.log('SUCCESS!');
					toast.success('Thank you, your message has been sent!');
				},
				(error) => {
					console.log('FAILED...', error.text);
				},
			);
	};

	return (
		<div>
			<h1>Contact us</h1>
			<form ref={form} onSubmit={sendEmail}>
				<label htmlFor='name'>Name</label><br />
				<input id="name" type="text" name="user_name" /><br />
				<label htmlFor='email'>Email</label><br />
				<input id="email" type="email" name="user_email" /><br />
				<label htmlFor='message'>Message</label><br />
				<textarea id="message" name="message" /><br />
				<input type="submit" value="Send" /><br />
			</form>
		</div>
		
	);
};