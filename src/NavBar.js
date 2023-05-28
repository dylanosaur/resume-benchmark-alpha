import Link from 'next/link';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { signOut } from './auth';

const API_URL = process.env.API_URL;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: inherit;
  color: inherit;
  text-decoration: underline;
  &:hover {
    font-weight: bold;
  }
`;

const NavBar = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const supabaseToken = getCookie('supabaseToken');
    if (supabaseToken) {
      fetch(`${API_URL}/user`, {
        headers: {
          Auth: `${supabaseToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const getCookie = (name) => {
    const cookieString = typeof window !== 'undefined' ? document.cookie : '';
    const cookies = cookieString.split('; ');
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      document.cookie = "supabaseToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUserEmail(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavContainer>
      <Link href="/">Home</Link>
      <Link href="/upload">Contribute Sample</Link>
      <Link href="/leaderboard">Leaderboard</Link>

      {userEmail && (
        <>
          <p>Welcome, {userEmail}!</p>
          <NavButton onClick={handleSignOut}>Sign Out</NavButton>
        </>
      )}
      {!userEmail && (
        <NavList>
          <NavItem>
            <Link href="/signin">Sign In</Link>
          </NavItem>
        </NavList>
      )}
    </NavContainer>
  );
};

export default NavBar;
