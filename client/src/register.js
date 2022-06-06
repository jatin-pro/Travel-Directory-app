import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import { useRef, useState } from "react";
import "./app.css";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("https://traveldirectoryapp.herokuapp.com/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logoR">
        <RoomIcon className="logoIcon" />
        <span>Register</span>
      </div>
      <form onSubmit={handleSubmit} className = "form">
        <input autoFocus placeholder="username" ref={usernameRef} className = "input"/>
        <input type="email" placeholder="email" ref={emailRef} className = "input" />
        <input className = "input"
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}