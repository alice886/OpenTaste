import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css'

const SignUpForm = ({ setShowSignUp }) => {
  const [errors, setErrors] = useState([]);
  const [doubleerrors, setDoubleErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowSignUp(false)
      }
    } else {
      setErrors(['Your password is not match the repeat password!'])
    }
  };

  const newErrors = [];
  useEffect(() => {
    if (username?.length > 30) {
      newErrors.push('Your username must be between 1 and 30 characters long.')
    }
    if (firstname?.length > 30) {
      newErrors.push('Your firstname must be between 1 and 30 characters long.')
    }
    if (lastname?.length > 30) {
      newErrors.push('Your lastname must be between 1 and 30 characters long.')
    }
    if (email?.length > 255) {
      newErrors.push('Your email must be between 1 and 255 characters long.')
    }
    if (password?.length > 255) {
      newErrors.push('Your password must be between 1 and 255 characters long.')
    }
    setDoubleErrors(newErrors)
  }, [doubleerrors.length, newErrors.length, username, firstname, lastname, email, password])



  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='register-modal'>
      <div className='cancel-signup'>
        <button onClick={() => setShowSignUp(false)} >x</button>
      </div>
      <h2>Register</h2>
      {errors.map((error, ind) => (
        <div className='auth-validate-error' key={ind}>* {error}</div>
      ))}
      {doubleerrors.map((error, ind) => (
        <div className='auth-validate-error' key={ind}>* {error}</div>
      ))}
      <label className='register-label'>User Name</label>
      <input
        type='text'
        name='username'
        onChange={updateUsername}
        value={username}
        className='register-input'
        required={true}
        maxLength={31}
      ></input>
      <label className='register-label'>First Name</label>
      <input
        type='text'
        name='firstname'
        onChange={updateFirstname}
        value={firstname}
        className='register-input'
        required={true}
        maxLength={31}
      ></input>
      <label className='register-label'>Last Name</label>
      <input
        type='text'
        name='lastname'
        onChange={updateLastname}
        value={lastname}
        className='register-input'
        required={true}
        maxLength={31}
      ></input>
      <label className='register-label'>Email</label>
      <input
        type='email'
        name='email'
        onChange={updateEmail}
        value={email}
        className='register-input'
        required={true}
        maxLength={256}
      ></input>
      <label className='register-label'>Password</label>
      <input
        type='password'
        name='password'
        onChange={updatePassword}
        value={password}
        className='register-input'
        required={true}
        maxLength={256}
      ></input>
      <label className='register-label'>Repeat Password</label>
      <input
        type='password'
        name='repeat_password'
        onChange={updateRepeatPassword}
        value={repeatPassword}
        required={true}
        maxLength={256}
        className='register-input'
      ></input>
      <div className='submit-signup'>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
