import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/Breadcrumb';
import Form from './form';
import SAlert from '../../components/Alert';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function TalentEdit() {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    role: '',
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneCategories = async () => {
    const res = await getData(`/cms/talents/${talentId}`);

    setForm({
      ...form,
      name: res.data.data.name,
      role: res.data.data.role,
      avatar: res.data.data.avatar,
      file: res.data.data.file,
    });
  };

  useEffect(() => {
    fetchOneCategories();
  }, []);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/image', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.targe.name === 'avatar') {
      if (e?.target?.files[0].type === 'image/jpg'
        || e?.target?.files[0].type === 'image/png'
        || e?.target?.files[0].type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size /3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'Type image png | jpg | png',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: '',
      role: '',
      name: '',
    };

    const res = await putData(`/cms/talents/${talentId}`, payload);
    if (res?.data?.data) {
      setIsLoading(false);
      dispatch(
        setNotif(true, 'success', `berhasil ubah speaker ${res.data.data.name}`)
      );
      navigate('/talents');
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={'Talents'}
        urlSecond={'/talents'}
        textThird={'Edit'}
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
};

export default TalentEdit;
