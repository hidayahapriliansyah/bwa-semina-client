import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { config } from '../../configs';

import { Navigate } from 'react-router-dom';
import { Container, Table, Spinner } from 'react-bootstrap';
import SButton from '../../components/Button';
import SBreadcrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';

export default function PageCategories() {
  const token = localStorage.getItem('token');
  console.log(token);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategoriesAPI = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setTimeout(() => {
          setData(res.data.data);
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        setIsLoading(false);
        console.log('err');
        console.log(err);
      }
    };

    getCategoriesAPI();
  }, []);

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
              <th>No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? <Spinner animation="border" variant="dark" />
              : data.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </>
  )
};

