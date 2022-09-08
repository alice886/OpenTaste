import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    setShowLogin(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
