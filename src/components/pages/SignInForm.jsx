import React from 'react'
import './SignInForm.css'
const SignInForm = () => {
  return (
      <div className='container'>
            <div className='header'>
                <div className='text'>Sign In with Google</div>
                <div className='inputs'>
                    <div className='input'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                        <input type="text" placeholder='Name'/>
                    </div>
                    <div className='input'>
                        <i class='fab fa-google'></i>
                        <input type="email" placeholder='Email'/>
                    </div>
                    <div className='input'>
                        <i class="fa fa-lock" aria-hidden="true"></i>
                        <input type="password" placeholder='Password'/>
                    </div>
                </div>
            </div>
            <div className="forgot-password">Forgot Password? <span>Click here!</span></div>
            {/* <div className="submit container">
                <div className="submit">Sign In</div>
            </div> */}
          <div className="submit-container">
            {/* <div className="submit" id="google-login-btn"> */}
                <button id="google-login-btn">
                      SIGN IN
                </button>
            {/* </div>   */}
           </div>
    </div>
  )
}

export default SignInForm
