import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import useDebounce from '../hooks/useDebounce';
import { useSelector } from 'react-redux';

const Products = ({ products }) => {
	const { error, isLoading } = useSelector(state => state.products);
	const [search, setSearch] = useState('');
	const debouncedValue = useDebounce(search);
	const sortedProducts = useMemo(() => {
		const key = new RegExp(search, 'gi');
		return products
			? products.filter(p => {
					return key.test(p.title);
			  })
			: [];
	}, [debouncedValue]);

	const submitHandler = e => {
		e.preventDefault();
	};
	return (
		<div className='container mt-10 min-h-[300px]'>
			<div className='flex items-center justify-between'>
				<h2 className='font-bold text-3xl text-primary'>All products</h2>
				<form className='relative' onSubmit={submitHandler}>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='border-2 outline-none border-primary ps-8 px-3 py-1.5 rounded-lg bg-transparent'
						type='search'
						name='search'
						placeholder='search'
					/>
					<i className='fa fa-magnifying-glass text-primary absolute top-1/2 left-2 -translate-y-1/2'></i>
				</form>
			</div>
			{error ? (
				<div className='text-primary font-semibold opacity-50 text-center pt-20 text-2xl'>
					Something went wrong :{'('}
				</div>
			) : isLoading ? (
				<div className='text-center pt-20'>
					<i className='fa fa-circle-notch text-primary fa-spin text-3xl'></i>
				</div>
			) : (
				<div>
					{products &&
					(debouncedValue.trim() != ''
						? sortedProducts.length > 0
						: products.length > 0) ? (
						<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-5'>
							{(debouncedValue.trim() != '' ? sortedProducts : products).map(
								p => (
									<ProductCard key={p.id} p={p} />
								)
							)}
						</div>
					) : (
						<div className='text-primary opacity-50 font-semibold pt-20 text-center text-2xl'>
							Empty {'(˚Δ˚)b'}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Products;
