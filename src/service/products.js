import axios from 'axios';

const productsService = {
	getAll: async () => await axios.get('https://dummyjson.com/products'),
	getByID: async id =>
		await axios.get(`https://dummyjson.com/products/${id}`),
};

export default productsService;
