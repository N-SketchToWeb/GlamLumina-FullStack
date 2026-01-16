import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { ShopContext } from '../context/ShopContext';
import loginImg from '../assets/login.webp';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(ShopContext);

  const [currState, setCurrState] = useState('Sign Up'); // Sign Up or Login
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (currState === 'Login') {
      const res = await API.post('/users/login', {
        email: formData.email,
        password: formData.password,
      });

      // IMPORTANT FIX
      setUser(res.data);
      setToken("dummy-token");

      alert(`Welcome back, ${res.data.name}!`);
      navigate('/');

    } else {
      await API.post('/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(`Account created successfully for ${formData.name}!`);
      setCurrState('Login');
      setFormData({ name: '', email: '', password: '' });
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data || 'Invalid credentials');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        {/* Left image */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="Login" className="object-cover h-full w-full" />
        </div>

        {/* Form side */}
        <div className="flex w-full sm:w-1/2 items-center justify-center text-[90%]">
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5">
            <h3 className="bold-36 text-[#00DD00]">{currState}</h3>

            {currState === 'Sign Up' && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-[#f6fcf0] mt-1"
                />
              </div>
            )}

            <div className="w-full">
              <label htmlFor="email" className="medium-15">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-[#f6fcf0] mt-1"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="medium-15">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-[#f6fcf0] mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn-secondary w-full mt-5 !py-[8px] !rounded"
              disabled={loading}
            >
              {loading ? 'Please wait...' : currState === 'Sign Up' ? 'Sign Up' : 'Login'}
            </button>

            <div className="w-full flex flex-col gap-y-3">
              <div className="underline medium-15 cursor-pointer">Forgot your password?</div>
              {currState === 'Login' ? (
                <div className="underline medium-15">
                  Don't have an account?{' '}
                  <span onClick={() => setCurrState('Sign Up')} className="cursor-pointer text-green-600">
                    Create account
                  </span>
                </div>
              ) : (
                <div className="underline medium-15">
                  Already have an account?{' '}
                  <span onClick={() => setCurrState('Login')} className="cursor-pointer text-green-600">
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
