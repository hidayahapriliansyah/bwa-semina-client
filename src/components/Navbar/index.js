import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import NavLink from '../NavLink';
import { useNavigate } from 'react-router-dom';

export default function SNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <NavLink action={() => navigate('/')}>Home</NavLink>
        <NavLink action={() => navigate('/categories')}>Categories</NavLink>
        <NavLink action={() => navigate('/talents')}>Talents</NavLink>
        <NavLink action={() => navigate('/events')}>Events</NavLink>
        <NavLink action={() => navigate('/participants')}>Participants</NavLink>
        <NavLink action={() => navigate('/transactions')}>Transactions</NavLink>
      </Nav>
    </Container>
  </Navbar>
  )
}
