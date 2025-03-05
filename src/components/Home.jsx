
import Products from './Products';
import { useSelector } from 'react-redux';

const Home = () => {
	const { products } = useSelector(state => state.products);

	return (
		<div>
			
			<Products products={products} />
		</div>
	);
};

export default Home;
