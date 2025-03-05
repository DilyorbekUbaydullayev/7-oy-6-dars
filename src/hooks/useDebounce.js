import { useEffect, useState } from 'react';

const useDebounce = initialValue => {
	const [value, setValue] = useState('');

	useEffect(() => {
		let i = setTimeout(() => {
			setValue(initialValue);
		}, 1000);

		return () => clearTimeout(i);
	}, [initialValue]);

	return value;
};

export default useDebounce;
