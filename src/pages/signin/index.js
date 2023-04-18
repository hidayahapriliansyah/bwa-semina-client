import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import { Card, Container } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import { config } from '../../configs';
import SForm from './form';

function PageSignin() {
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        form,
      );

      localStorage.setItem('token', res.data.data.token);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        type: 'danger',
        message: err?.response?.data?.msg ?? 'Internal Server Error',
      });
    }
  };

  if (token) return <Navigate to='/' replace={true} />;

  return (
    <Container md={12} className='my-5'>
      <div className="m-auto" style={{ width: '50%' }}>
        { alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: '50%' }} className='m-auto mt-5 p-2'>
        <Card.Body>
          <Card.Title className='text-center'>Form Signin</Card.Title>
        </Card.Body>
        <SForm
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Card>
    </Container>
  );
}

export default PageSignin;