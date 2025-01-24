import React ,{ useCallback, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import {UserDataContext} from '../context/UserContext'
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const {setUser} = React.useContext(UserDataContext);

  const Submithandler = async(e) => {
    e.preventDefault();
    try { 
      const Existinguser = {
          email: email,
          password: password,
      };
      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          Existinguser
      );

      if (response.status === 200) {
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token',data.token)
          navigate('/home');
      }
      setEmail('');
      setPassword('');
  } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login failed. Please try again.');
  }
  
    setEmail('')
    setPassword('')
  };

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img
          className="w-20 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            Submithandler(e);
          }}
          action="submit"
        >
          <h3 className="text-lg font-medium mb-1">What&apos;s your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-1">Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            New here? 
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to='/Captain-login' className="bg-[#10b461] flex justify-center item-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
