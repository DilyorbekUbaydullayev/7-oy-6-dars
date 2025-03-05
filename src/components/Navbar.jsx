import React from 'react';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Navbar = () => {
	const cart=useSelector(state=>state.cart.cart)

	let TotalPrice = cart.reduce((acc,product)=>acc+ product.price,0)
		
	return (
		<div className='container border-b-2 border-primary flex justify-between items-center py-3'>
			<a href='/' className='flex items-center gap-5 text-primary'>
				<img src='/macro.jpeg' width={80} alt='logo' />
				<div>
					<span className='block text-3xl font-semibold'>Macro Market</span>
					<span className='text-sm'>The best of Supermarkets</span>
				</div>
			</a>
			<div className='flex gap-5 items-center text-primary text-2xl'>
				
				<div className="relative">
              <Link to='/cart'>
					<i className='fa me-2 fa-shopping-cart'></i>
				</Link>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            </div>
				<span>{TotalPrice.toFixed(2)} $</span>
				<a href='/'>
					<i className='fa-regular fa-heart'></i>
				</a>
				<a href='/'>
					<i className='fa-regular fa-user'></i>
				</a>
				
				
			</div>
		</div>
	);
};

export default Navbar;
