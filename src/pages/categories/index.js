import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { config } from '../../configs';

import { Navigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadcrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';

export default function PageCategories() {
  const token = localStorage.getItem('token');
  console.log(token);

  const [data, setData] = useState([]);
  
  
  useEffect(() => {
    const getCategoriesAPI = async () => {
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        setData(res.data.data);
        console.log('data');
        console.log(data);
      } catch (err) {
        console.log('err');
        console.log(err);
      }
    };

    getCategoriesAPI();
  }, [data]);

  if (!token) return <Navigate to='/signin' replace={true} />;
  
  return (
    <>
      <SNavbar />
      <Container className='mt-3'>
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

