import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import { useRef, useState } from "react";
import "./app.css";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("https://traveldirectoryapp.herokuapp.com/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <RoomIcon className="logoIcon" />
        <span>Log in </span>
        
      </div>
      <form onSubmit={handleSubmit} className= "form">
        <input autoFocus placeholder="username" ref={usernameRef} className = 'input' />
        <input
         className = 'input' 
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}