import axios from 'axios';
import {apiUrl} from '../config';

const baseURL = apiUrl;

const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const getAllStats = () => {
	return instance({
		url: 'statistic',
		method: 'GET',
	});
};

// Add a response interceptor
instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error?.response);
	}
);

export const apiCall = {
	getAllStats,
};
