import React from 'react'
import './Login.css';
import assets from '../../../assets/assets';


const Login = () => {
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo' />
        <form className="login-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder='Username' className='form-input' required />
            <input type="email" placeholder='Email' className='form-input' />
            <input type="password" placeholder='Password' className='form-input' />
            <button type='submit'>Sign Up</button>
            <div className="login-term">
                <input type="checkbox" />
                <p>Agree to Terms of use & privacy policy</p>
            </div>
            <div className="login-forget">
                <p className="login-toggle">Already have an account <span>Click here</span> </p>
            </div>
        </form>
    </div>
  )
}

export default Login