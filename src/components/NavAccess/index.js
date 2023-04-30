import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function NavLink({ action, children }) {
  return <Nav.Link onClick={action} >{children}</Nav.Link>
};
