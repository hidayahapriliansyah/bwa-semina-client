import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryEdit() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [form, setForm] = useState({
    name: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.targe.value});
  };

  const fetchOneCategory = async () => {

  };

  useEffect(() => {
    fetchOneCategory();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      navigate('/categories');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: err.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={'Categories'}
        urlSecond={'/categories'}
        textThird={'Create'}
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CategoryEdit;
