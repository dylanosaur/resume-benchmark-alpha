import React, { useState } from 'react';
import { supabase, signUp, signIn, signOut } from '../auth';
import { StyledSignIn } from './Signin/signinStyles';
import NavBar from '../NavBar'
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showModal, setShowModal] = useState(false); // text feedback appears on screen for forgot password
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({})

  const resetSigninPage = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowModal(false);
  }


  const handleSignIn = async () => {
    try {
      let user = {}
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data) {
        // user = data.user
        setIsLoggedIn(true); // update state to indicate that the user is logged in
        setUser({"email": data.user.email})
      }

      if (error) {
        throw error;
      }

      // Save the token in a cookie
      console.log(data)
      document.cookie = `supabaseToken=${data?.session?.access_token}`;

    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      resetSigninPage()
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggle = () => {
    setIsSigningUp(!isSigningUp);
    resetSigninPage()
  };

  const handleForgotPassword = async () => {
    
    try {
      if (email.length < 6) {
        alert('fill in email field')
        return
      }
      await supabase.auth.resetPasswordForEmail(email);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordKeyDown = (event) => {
    if (event.keyCode === 13) { // Enter key
      if (isSigningUp) {
        handleSignUp();
      } else {
        handleSignIn();
      }
    }
  };

  return (
    <StyledSignIn>
      <NavBar />
      {isSigningUp ? (
        <>
          <h2>Sign Up</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
          />
          {error && <p>{error}</p>}
          <button onClick={handleSignUp}>Sign Up</button>
          <p className="toggle">
            Already have an account?{' '}
            <button onClick={handleToggle}>Sign In</button>
          </p>
        </>
      ) : 
        isLoggedIn?(
          <>
            <p>Welcome {user?.email}!</p>
            <Link href="/">Home</Link>
          </>
        ):(
        <>
          <h2>Sign In</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
          />
          {error && <p>{error}</p>}
          <button onClick={handleSignIn}>Sign In</button>
          <p className="toggle">
            Don't have an account yet?{' '}
            <button onClick={handleToggle}>Sign Up</button>
          </p>
          <button onClick={handleForgotPassword}>Forgot password?</button>
              {showModal && ( // display modal if showModal is true
                <div>
                  Password reset email sent to {email}.{' '}
                  <button onClick={() => setShowModal(false)}>x</button>
                </div>
              )}
        </>
      )}
    </StyledSignIn>
  );

};

export default SignIn;
