import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import { getAuth, signOut } from "firebase/auth"; // Import Firebase authentication
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false); // Track signed-in state

    const auth = getAuth(); // Initialize Firebase auth instance

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const navigate = useNavigate(); // Initialize navigate function from useNavigate

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const handleSignOut = () => {
        const confirmation = window.confirm("Do you want to sign out?");
        if (confirmation) {
            signOut(auth)
                .then(() => {
                    setIsSignedIn(false);
                    console.log("Signed out successfully");
                })
                .catch((error) => {
                    console.error("Error signing out:", error);
                });
        }
    };

    useEffect(() => {
        showButton();
        // Simulate checking authentication state
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user); // Update state based on user presence
        });
        return () => unsubscribe(); // Clean up listener
    }, []);
    const handleHomeClick = () => {
        if (isSignedIn) {
            navigate('/HomeCustom'); 
        }
        else {
            navigate('/');
        }
    };
    const handlePitStopClick = () => {
        if (isSignedIn) {
            navigate('/CustomPage'); // Redirect to PIT STOP if signed in
        }
        else {
            navigate('/');
        }
    };
    const handleViewRaceScheduleClick = () => {
        navigate('/ViewRaceSchedule');
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div className='navbar-logo'>
                        <span   className='nav-links'
                                onClick={() => { closeMobileMenu(); handlePitStopClick(); }}>
                            PIT STOP <i className='fab fa-bars' />
                        </span>
                    </div>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <span
                                className='nav-links'
                                onClick={() => { closeMobileMenu(); handleHomeClick(); }}
                            >
                                Home
                            </span>
                        </li>
                        <li className='nav-item'>
                            <Link to='/make-prediction' className='nav-links' onClick={closeMobileMenu}>
                                Make Prediction
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <span
                                className='nav-links'
                                onClick={() => { closeMobileMenu(); handleViewRaceScheduleClick(); }}
                            >
                                View Race Schedule
                            </span>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                    </ul>
                    {button && (
                        isSignedIn ? (
                            <Button
                                buttonStyle="btn--outline"
                                onClick={handleSignOut}
                            >
                                SIGN OUT
                            </Button>
                        ) : (
                            <Link to="/SignInWithGoogle">
                                <Button buttonStyle="btn--outline" linkTo="/SignInForm">
                                    SIGN IN
                                </Button>
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
