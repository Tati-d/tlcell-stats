import React, {useState, useEffect} from 'react';
import {Spinner} from 'react-bootstrap';

//styles
import './Loader.sass';

export const Loader = ({isVisible = false}) => {
	return isVisible ? (
		<div className="Loader__wrap">
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	) : null;
};
