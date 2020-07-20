import React, {useState, useEffect} from 'react';
import './App.sass';
import {Container, Row, Spinner} from 'react-bootstrap';

//UI Components
import {Header} from './components/Header/Header';
import {Filters} from './components/Filters/Filters';
import {LoginForm} from './components/LoginForm/LoginForm';
import {Loader} from './components/Loader/Loader';

//LocaLStorage
import {getToken, setToken, removeToken} from './utils/localStorage';

const App = () => {
	const [isLoginIn, setIsLoginIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const onFormSubmit = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoginIn(true);
			setToken();
			setIsLoading(false);
		}, 1000);
	};

	useEffect(() => {
		const token = getToken();
		if (token) {
			setIsLoginIn(true);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	const logOut = () => {
		removeToken();
		setIsLoginIn(false);
	};

	return (
		<>
			<Header isLoginIn={isLoginIn} onLogout={logOut} />
			{isLoading ? (
				<Loader isVisible={TextTrackCueList} />
			) : isLoginIn ? (
				<Filters />
			) : (
				<LoginForm onSubmit={onFormSubmit} />
			)}
		</>
	);
};

export default App;
