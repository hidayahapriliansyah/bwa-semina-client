import React from 'react'
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';

export default function Dashboard() {
  // const token = localStorage.getItem('auth');

  // if (!token) return <Navigate to='/signin' replace={true} />;

  return (
    <Container className='mt-3'>
      <SBreadcrumb />
      <h1>Dashboard</h1>
    </Container>
  )
};

