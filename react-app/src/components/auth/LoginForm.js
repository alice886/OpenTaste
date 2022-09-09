import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'

const LoginForm = ({ setShowLogin }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [password, setPassword] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setShowLogin(false)
      history.push('/')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    } else {
      setShowLogin(false)
      history.push('/')
    }
  }
  console.log(errors)

  return (
    <form className='login-modal' >
      <div className='cancel-signin'>
        <button onClick={() => setShowLogin(false)} >x</button>
      </div>
      <div className='signin-title'>Sign In</div>
      <div className='signin-error'>
        {errors.map((error, ind) => (
          <div className='auth-validate-error' key={ind}>* {error.split(':')[0].charAt(0).toUpperCase() + error.split(':')[0].slice(1)}:{error.split(':')[1]}</div>
        ))}
      </div>
      <label className='signin-label' htmlFor='email'>  Email</label>
      <input
        name='email'
        type='text'
        placeholder='Email'
        value={email}
        onChange={updateEmail}
        className='signin-input'
        required
        maxLength={37}
      />
      <label className='signin-label' htmlFor='password'>  Password</label>
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={updatePassword}
        className='signin-input'
        required
        maxLength={41}
      />
      <div className='signin-buttom-container'>
        <button className='singin-button' onClick={onLogin} type='submit'>Login</button>
        <button className='singin-button' onClick={demoLogin}>Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
