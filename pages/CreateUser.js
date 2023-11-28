import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layouts/Layout';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', {
        name,
        email,
        password,
      });

      setSuccessMessage(response.data.message);
      setError(null);

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.response.data.error);
      setSuccessMessage(null);
    }
  };

  return (
    <Layout>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='container'>
        <div className='card my-5'>
            <div className='card-header'>
                <h2>Create a new user</h2>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">
                    Create User
                    </button>
                </form>
            </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default CreateUserForm;
