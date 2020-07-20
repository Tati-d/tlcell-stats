const TOKEN = '@TLCELL-LOGIN';

const getToken = () => {
	try {
		const token = localStorage.getItem(TOKEN);
		return !!token ? token : null;
	} catch (err) {
		console.log(err);
	}
};

const setToken = () => {
	localStorage.setItem(TOKEN, TOKEN);
	console.log('TOKEN WAS ADDED SUCCESS');
};

const removeToken = () => {
	localStorage.removeItem(TOKEN);
	console.log('TOKEN WAS REMOVED');
};

export {getToken, setToken, removeToken};
