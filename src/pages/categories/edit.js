import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, putData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function CategoryEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [form, setForm] = useState({
    form: '',
  });
  
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const fetchOneCategories = async () => {
    const res = await getData(`/cms/categories/${categoryId}`);

    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/categories/${categoryId}`, form);
    if (res?.data?.data) {
      dispatch(
        setNotif(
            true,
            'success',
            `berhasil ubah kategori ${res.data.data.name}`,
          )
      );
      setIsLoading(false);
      navigate('/categories');
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }

    // const res = await putData(`/cms/categories/${categoryId}`, form);
    // if (res?.data?.data) {
      // dispatch(
        // setNotif(
        //   true,
        //   'success',
        //   `berhasil ubah kategori ${res.data.data.name}`
        // )
      // );
    //   setIsLoading(false);
    //   navigate('/categories');
    // } else {
    //   setIsLoading(false);
    //   setAlert({
    //     ...alert,
    //     status: true,
    //     type: 'danger',
    //     message: res.response.data.msg,
    //   });
    // }
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
      edit
      form={form}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  </Container>
  );
};

export default CategoryEdit;