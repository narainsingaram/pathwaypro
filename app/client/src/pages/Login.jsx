import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './style.css'; // Import your CSS file

// Your Firebase configuration (replace with your actual configuration)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful!');
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Account created!');
      }
      // Clear the form
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="error">{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLoginMode((prev) => !prev)}>
          {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;
