import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Products } from './';
import { useSelector } from 'react-redux';
const Filter = () => {
	const { q } = useParams();
	const { products } = useSelector(state => state.products);

	const sortedProducts = useMemo(() => {
		const key = new RegExp(q, 'gi');
		return products
			? products.filter(p => {
					return key.test(p.title);
			  })
			: [];
	}, [q]);
	return (
		<div>
			<h2>Sorted Products</h2>
			<div>
				<Products products={sortedProducts} />
			</div>
		</div>
	);
};

export default Filter;
