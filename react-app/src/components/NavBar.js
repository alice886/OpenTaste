import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../components/context/Modal';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignUp] = useState(false)

  return (
    <>
      {(sessionUser) ?
        (<nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav >) : (
          <nav>
            <ul>
              <li>
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li>
              <li>
                <button exact={true} activeClassName='active' onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </li>
              <li>
                <button exact={true} activeClassName='active' onClick={() => setShowSignUp(true)}>
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
