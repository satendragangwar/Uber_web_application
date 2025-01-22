import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {


     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [Captain,setCaptain] = useState({})
    
      const Submithandler = (e) => {
        e.preventDefault();
        setCaptain({
            email:email,
            password:password
        })
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
              Join a fleet?
              <Link to="/Captain-signup" className="text-blue-600">
                Register as a Captain
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-[#d5622d] flex justify-center item-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
