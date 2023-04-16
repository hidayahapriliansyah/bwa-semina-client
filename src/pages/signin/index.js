import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SButton from '../../components/Button';
import SAlert from '../../components/Alert';

function PageSignin() {
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
        'http://localhost:9000/api/v1/cms/auth/signin',
        {
          email: form.email,
          password: form.password,
        }
        );
        
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


  return (
    <Container md={12} className='my-5'>
      <div className="m-auto" style={{ width: '50%' }}>
        { alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: '50%' }} className='m-auto mt-5 p-2'>
        <Card.Body>
          <Card.Title className='text-center'>Form Signin</Card.Title>
        </Card.Body>
        <Form>
          <TextInputWithLabel 
            label='Email address'
            name="email"
            value={form.email}
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <TextInputWithLabel 
            label='Password'
            name="password"
            value={form.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <SButton 
            loading={isLoading}
            disabled={isLoading}
            action={handleSubmit}
            variant="primary"
            type="submit"
          >
          Submit
          </SButton>
        </Form>
      </Card>
    </Container>
  );
}

export default PageSignin;