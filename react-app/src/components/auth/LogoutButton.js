import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowLogin }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setShowLogin(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
