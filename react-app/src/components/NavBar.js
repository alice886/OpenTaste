import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../components/context/Modal';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import LogoutButton from './auth/LogoutButton';
// import profileicon from './icons/profile-icon.jpeg';
import Profileicon from '../icons/Profileicon.jpeg';
import Logo from '../icons/Logo.jpg';

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
        (<nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} >
                <img src={Logo} alt='logo' height={'20px'} />
              </NavLink>
            </li>
            <li>
              <button onClick={handleProfile}>
                <input type='image' src={Profileicon} alt='profile icon' height={'20px'}></input>
              </button>
              {showMenu && (
                <ul>
                  <div> Hello, {sessionUser.username}!</div>
                  <li>
                    <NavLink to='/myprofile' exact={true} >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/myrestaurants' exact={true} >
                      My Restaurants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/myreservations' exact={true} >
                      My Reservations
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>)}
            </li>
          </ul>
        </nav >) : (
          <nav>
            <ul>
              <li>
                <NavLink to='/' exact={true} >
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li> */}
              <li>
                <button exact={true} onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </li>
              <li>
                <button exact={true} onClick={() => setShowSignUp(true)}>
                  Sign Up
                </button>
              </li>
              {showLogin && <Modal onClose={() => setShowLogin(false)}>
                <LoginForm setShowLogin={setShowLogin} />
              </Modal>}
              {showSignup && <Modal onClose={() => setShowSignUp(false)}>
                <SignUpForm setShowSignUp={setShowSignUp} />
              </Modal>}
            </ul>
          </nav>
        )
      }
    </>
  );
}

export default NavBar;
