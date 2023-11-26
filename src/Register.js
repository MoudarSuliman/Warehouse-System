import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = { id: nextId, user, pwd };
    setNextId(nextId + 1);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/products');
        } else {
          setErrorMessage('Registration failed. Please try again.');
          setShowError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Registration failed. Please try again.');
        setShowError(true);
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
        <h2>Register</h2>
        <label>Email address</label>
        <input
          required
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleUser}
        />
        <label>Password</label>
        <input
          required
          type="password"
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
          Submit
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </form>
  );
};
