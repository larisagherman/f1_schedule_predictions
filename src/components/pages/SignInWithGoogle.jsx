import React from 'react';
import './SignInWithGoogle.css'; // Import the CSS file
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const SignInWithGoogle = () => {
  const navigate = useNavigate();  // For page navigation after successful login

  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();  // Properly instantiate GoogleAuthProvider
    const result = await signInWithPopup(auth, provider);
    console.log('Signed in with Google:', result.user);

    // After successful login, navigate to the user profile/dashboard page
    navigate('/CustomPage');
  }
  return (
    <div className='container'>
            {/* <div className='header'>
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
            </div> */}
            {/* <div className="forgot-password">Forgot Password? <span>Click here!</span></div> */}
            <div className="submit-container">
              <button onClick={handleGoogle}  className="submit">
                Sign In with Google
              </button>
            </div>
     </div>
  );
}

export default SignInWithGoogle;
