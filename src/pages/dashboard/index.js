import React from 'react'
import { Navigate } from 'react-router-dom';
import { Container, Nav, Navbar, Breadcrumb, Table } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadcrumb from '../../components/Breadcrumb';

export default function Dahsboard() {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to='/signin' replace={true} />;
  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className='mt-3'>
        {/* <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb> */}

        <SBreadcrumb textSecond={'Categories'} />

        <SButton>Tambah</SButton>

        <Table className='mt-3' striped variant='dark'>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  )
};

