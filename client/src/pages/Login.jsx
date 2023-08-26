import React, { useRef, useState } from 'react'
import './login.css'
import axios from 'axios'


const Login = ({onLogin}) => {
    const username = useRef();
    const password = useRef();
    const remember = useRef(null);
const [checked , setChecked] = useState(false);


const handleCheckboxChange = () => {
    setChecked( remember.current.checked)
  };

 const handleSubmit = async(e) =>{
        e.preventDefault();
const data ={
    username : username.current.value,
    password: password.current.value,
    rememberMe: checked
};
try{
    const res = await axios.post('http://localhost:3000/api/user/login', data);
    const token = res.data.token;
      if(!token){
        alert("Invalid Credentials")
      }
      else{
           sessionStorage.setItem('token',token);
          onLogin(token);
      }
}catch(err){
                console.log(err)
    }
}
  return (
    <>
    <div className='body'>
        <div className="wrapper">
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" placeholder="Enter username" required ref={username}/>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Enter password" ref={password} required />
          </div>
          <div className="remember">
            <input type="checkbox" value={false} onChange={handleCheckboxChange} ref={remember}/>
            <h3>Remember Me</h3>
          </div>
          <div className="text">
            <button type='submit' className='button'>Log In</button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Login