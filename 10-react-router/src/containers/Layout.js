/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <div
      css={css`
        padding: 0.75rem;
        background-color: ${props.bg || 'white'};
        border-bottom: ${props.border || '#f5f5f5'};
        height: 72px;
      `}
      {...props}
    >
      {props.children}
    </div>
  );
};

export const Layout = props => {
  return (
    <div
      css={css`
        position: relative;
        margin: 0;
        padding: 0;
        height: 100vh;
      `}
      {...props}
    >
      <NavBar>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/events/12">Event</Link>
        <Link to="/nono">NoRoute</Link>
      </NavBar>
      {props.children}
    </div>
  );
};
