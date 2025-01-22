import { Link } from "react-router-dom";
import { useState,useCallback } from "react";

const CaptainSignup = () => {
 
  const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [firstname,setFirstname] = useState('')
      const [lastname,setLastname] = useState('')
      const [captainData,setCaptainData] = useState({})
  
      
      const Submithandler = (e)=>{
          e.preventDefault();
          setCaptainData({
          fullname:{
              firstname:firstname,
              lastname:lastname
          },
          email:email,
          password:password
         })
          setEmail('')
          setPassword('')
          setFirstname('')
          setLastname('')
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
           src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
            Login
          </button>
          <p className="text-center">
            Already have an account? 
            <Link to="/Captain-login" className="text-blue-600">
               Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[12px] leading-tight">
          This site is protected by reCAPTCHA and Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup