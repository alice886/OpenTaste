import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css'

const SignUpForm = ({ setShowSignUp }) => {
  const [errors, setErrors] = useState([]);
  const [doubleerrors, setDoubleErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, password));
      // const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowSignUp(false)
      }
    } else {
      setErrors(['Your password is not match the repeat password!'])
    }
  };

  const inputRegex = /\s/;

  const newErrors = [];
  useEffect(() => {
    if (username?.length > 30) {
      newErrors.push('Your username must be between 1 and 30 characters long.')
    }
    if (username?.match(inputRegex)) {
      newErrors.push("Whitespace in username is not allowed.")
    }
    if (first_name?.length > 30) {
      newErrors.push('Your firstname must be between 1 and 30 characters long.')
    }
    if (first_name?.match(inputRegex)) {
      newErrors.push("Whitespace in first name is not allowed.")
    }
    if (last_name?.length > 30) {
      newErrors.push('Your lastname must be between 1 and 30 characters long.')
    }
    if (last_name?.match(inputRegex)) {
      newErrors.push("Whitespace in last name is not allowed.")
    }
    if (email?.length > 50) {
      newErrors.push('Your email must be between 1 and 50 characters long.')
    }
    if (email?.match(inputRegex)) {
      newErrors.push("Whitespace in email is not allowed.")
    }
    if (password?.length > 50) {
      newErrors.push('Your password must be between 1 and 50 characters long.')
    }
    if (password?.match(inputRegex)) {
      newErrors.push("Whitespace in password is not allowed.")
    }
    setDoubleErrors(newErrors)
  }, [doubleerrors.length, newErrors.length, username, first_name, last_name, email, password])



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
      <div className='register-title'>Register</div>
      {errors.map((error, ind) => (
        <div className='auth-validate-error1' key={ind}>* {error}</div>
      ))}
      {doubleerrors.map((error, ind) => (
        <div className='auth-validate-error2' key={ind}>* {error}</div>
      ))}
      <div className='register-input-container'>
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
          value={first_name}
          className='register-input'
          required={true}
          maxLength={31}
        ></input>
        <label className='register-label'>Last Name</label>
        <input
          type='text'
          name='lastname'
          onChange={updateLastname}
          value={last_name}
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
          maxLength={51}
        ></input>
        <label className='register-label'>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className='register-input'
          required={true}
          maxLength={51}
        ></input>
        <label className='register-label'>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          maxLength={51}
          className='register-input'
        ></input>
      </div>
      <div className='submit-signup'>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
