import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../lib/slices/userSlice';
import { setLocalStorage } from '../lib/ls';

const Register = () => {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id:Date.now(),
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLogin: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "To'liq ism kiritilishi shart";
    }
    
    if (!formData.email) {
      newErrors.email = "Email kiritilishi shart";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email manzili noto'g'ri formatda";
    }
    
    if (!formData.password) {
      newErrors.password = "Parol kiritilishi shart";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Parolni tasdiqlash kerak";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmadi";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        let isExist = users.find((user) => user.email === formData.email);
        if (!isExist) {
          dispatch(addUser(formData));
            alert("Ro'yxatdan o'tish muvaffaqiyatli!");
            setLocalStorage("users", users);
            navigate('/login');
    
        } else {
          alert("Bunday foydalanuvchi allaqachon mavjud!");
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Ro'yxatdan o'tish</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              To'liq ism
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="To'liq ismingizni kiriting"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              type="email"
              id="email"
              name="email"
              placeholder="Email manzilingizni kiriting"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Parol
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              type="password"
              id="password"
              name="password"
              placeholder="Parolingizni kiriting"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Parolni tasdiqlash
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Parolingizni tasdiqlang"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div className="mb-6">
            <button
              className="w-full bg-primary cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              type="submit"
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Allaqachon hisobingiz bormi? {' '}
            <Link to="/login" className="text-primary hover:text-red-900 font-medium">
              Tizimga kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;