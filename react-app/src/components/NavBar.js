import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../components/context/Modal';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import LogoutButton from './auth/LogoutButton';
// import profileicon from './icons/profile-icon.jpeg';
import Logo from '../icons/Logo.jpg';
import GrayLogo from '../icons/GrayLogo.jpg';
import '../components/navbar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignUp] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleProfile = async e => {
    e.preventDefault();
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      {(sessionUser) ?
        (<div className='nav-user-container'>
          <div className='nav-logo'>
            <NavLink to='/' exact={true} >
              <img src={Logo} alt='logo' />
            </NavLink>
            <NavLink to='/' exact={true} >
              OpenTaste
            </NavLink>
          </div>
          <div className='nav-button-container'>
            <button className='nav-button' onClick={handleProfile}>
              <input className='nav-button-img' type='image' src={GrayLogo} alt='profile icon'></input>
            </button>
            {showMenu && (
              <ul className='nav-user-dropdown'>
                <div className='nav-user-greeting'> Hello, {sessionUser.username}!</div>
                <li className='nav-user-greeting'>
                  <NavLink to='/myrestaurants' exact={true} >
                    My Restaurants
                  </NavLink>
                </li>
                <li >
                  <NavLink to='/myreservations' exact={true} >
                    My Reservations
                  </NavLink>
                </li>
                <li className='nav-button-logout'>
                  <LogoutButton setShowLogin={setShowLogin} />
                </li>
              </ul>)}
          </div>
        </div >) : (
          <div className='nav-user-container' >
            <div className='nav-logo'>
              <NavLink to='/' exact={true} >
                <img src={Logo} alt='logo' />
              </NavLink>
              <NavLink to='/' exact={true} >
                OpenTaste
              </NavLink>
            </div>
            <div className='nav-button-container'>
              <button exact={true} onClick={() => setShowLogin(true)} className='login'>
                Login
              </button>
              <button exact={true} onClick={() => setShowSignUp(true)} className='signup'>
                Sign Up
              </button>
            </div>
            {showLogin && <Modal onClose={() => setShowLogin(false)}>
              <LoginForm setShowLogin={setShowLogin} />
            </Modal>}
            {showSignup && <Modal onClose={() => setShowSignUp(false)}>
              <SignUpForm setShowSignUp={setShowSignUp} />
            </Modal>}
          </div>
        )
      }
    </>
  );
}

export default NavBar;
