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
            
            <div className="submit-container">
              <button onClick={handleGoogle}  className="submit">
                Sign In with Google
              </button>
            </div>
     </div>
  );
}

export default SignInWithGoogle;
