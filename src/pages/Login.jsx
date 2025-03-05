import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../lib/slices/userSlice';

const Login = () => {
    const users=useSelector(state=>state.users.users)
    const navigate = useNavigate()
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        let isExist = users.filter(user => user.email === formData.email && user.password === formData.password)
      if (isExist.length>0) {
        alert("Tizimga kirish muvaffaqiyatli!");
        dispatch(setLogin(isExist[0].id))
        navigate('/')
      } else {
        alert("Email yoki parol noto'g'ri kiritildi!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tizimga kirish</h2>
        
        <form onSubmit={handleSubmit}>
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
          
          <div className="mb-6">
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
            <button
              className="w-full bg-primary cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              type="submit"
            >
              Kirish
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Hisobingiz yo'qmi? {' '}
            <Link to="/register" className="text-primary hover:text-red-900 font-medium">
              Ro'yxatdan o'tish
            </Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Login;