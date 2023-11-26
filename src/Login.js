import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((users) => {
        const loggedInUser = users.find((userData) => userData.user === user);

        if (loggedInUser) {
          if (loggedInUser.pwd === pwd) {
            navigate('/products');
          } else {
            setErrorMessage('Incorrect password.');
            setShowError(true);
          }
        } else {
          setErrorMessage('Incorrect username.');
          setShowError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const handlePwd = (event) => {
    setPwd(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-form">
        <h2>Login</h2>
        <label>Email address</label>
        <input
          required
          type="email"
          value={user}
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleUser}
        />
        <label>Password</label>
        <input
          required
          type="password"
          value={pwd}
          className="form-control"
          placeholder="Password"
          onChange={handlePwd}
        />
        {showError && (
          <div className="card-body">
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </form>
  );
};
