import React from "react";
import { Link , useNavigate } from "react-router-dom";
import { useState,useCallback } from "react";
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'
const UserSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    

    const navigate = useNavigate();
    const {setUser} = React.useContext(UserDataContext);
    const Submithandler = async(e)=>{
        e.preventDefault();
        try {
          const newUser = {
              fullname: {
                  firstname: firstname,
                  lastname: lastname,
              },
              email: email,
              password: password,
          };
  
          const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/users/register`,
              newUser
          );
  
          if (response.status === 200) {
              const data = response.data;
              setUser(data.user);
              localStorage.setItem('token',data.token)
              navigate('/home');
          }
          setEmail('');
          setPassword('');
          setFirstname('');
          setLastname('');
      } catch (error) {
          console.error('Error during registration:', error.message);
          alert('Registration failed. Please try again.');
      }
    }
    
    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
      }, []);
    
      const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
      }, []);

      const handleFirstnameChange = useCallback((e) => {
        setFirstname(e.target.value);
      }, []);
     
      const handleLastnameChange = useCallback((e) => {
        setLastname(e.target.value);
      }, []);

  return (
    <div>
         <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img
          className="w-20 mb-6"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            Submithandler(e);
          }}
          action="submit"
        >
        
        <h3 className="text-lg font-medium mb-1">What&apos;s your name</h3>
        <div className="flex gap-3 mb-4">
        <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            required
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={handleFirstnameChange}
          />
           <input
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            required
            type="text"
            placeholder="Second name"
            value={lastname}
            onChange={handleLastnameChange}
          />
        </div>
            
          <h3 className="text-lg font-medium mb-1">What&apos;s your email</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full ttext-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmailChange}
          />

          <h3 className="text-lg font-medium mb-1">Password</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="bg-[#111] text-white font-semibold mb-1 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create account
          </button>
          <p className="text-center">
            Already have an account? 
            <Link to="/login" className="text-blue-600">
               Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[12px] leading-tight">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
    </div>
  )
}

export default UserSignup