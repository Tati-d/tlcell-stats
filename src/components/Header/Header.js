import React from 'react';
import {Navbar, Container, Row, Button} from 'react-bootstrap';

//styles
import './Header.sass';

export const Header = ({isLoginIn = true, onLogout = () => {}}) => {

	return (
		<Navbar expand="lg" variant="light" className={'Header'}>
			<Container>
				<Navbar.Brand href="#">TLCELL</Navbar.Brand>
				{isLoginIn ? (
					<Button variant="link" onClick={onLogout}>
						Admin
					</Button>
				) : null}
			</Container>
		</Navbar>
	);
};
