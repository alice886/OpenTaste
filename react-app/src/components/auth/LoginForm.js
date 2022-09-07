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
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

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

  return (
    <form className='login-modal' >
      <div className='cancel-signin'>
        <button onClick={() => setShowLogin(false)} >x</button>
      </div>
      <h2>Sign In</h2>
      <div>
        {errors.map((error, ind) => (
          <div className='auth-validate-error' key={ind}>* {error}</div>
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
        required={true}
      />
      <label className='signin-label' htmlFor='password'>  Password</label>
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={updatePassword}
        className='signin-input'
        required={true}
      />
      <div className='signin-buttom-container'>
        <button className='singin-button' onClick={onLogin} type='submit'>Login</button>
        <button className='singin-button' onClick={demoLogin}>Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
