import React, {useState, useEffect} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

//styles
import './LoginForm.sass';

export const LoginForm = ({onSubmit = () => {}}) => {
	const [userName, setUserName] = useState('');
	const [password, setPassord] = useState('');

	const credentials = {
		user: 'pur_root',
		password: 'GnOIRENM@24299545',
	};

	const onChangeUserName = (newVal) => {
		setUserName(newVal.target.value);
	};

	const onChangeUPassword = (newVal) => {
		setPassord(newVal.target.value);
	};

	const validateForm = () => {
		return (
			userName.toLowerCase() === credentials.user.toLowerCase() &&
			password.toLowerCase() === credentials.password.toLowerCase()
		);
	};

	const submitForm = () => {
		if (validateForm()) {
			onSubmit();
		} else {
			alert('Wrong data');
		}
	};

	return (
		<Container>
			<Form className="LoginForm">
				<Form.Group controlId="formBasic">
					<Form.Label>User Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter user name"
						onChange={onChangeUserName}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={onChangeUPassword}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={submitForm}>
					Submit
				</Button>
			</Form>
		</Container>
	);
};
