import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { useSelector, useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import {
  fetchingListsCategories,
  fetchingListsTalents,
} from '../../redux/lists/actions';
import { useNavigate } from 'react-router-dom';

function EventsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    title: '',
    date: '',
    file: '',
    avatar: '',
    about: '',
    venueName: '',
    tagline: '',
    keyPoint: [''],
    tickets: [{
      type: '',
      status: '',
      stock: '',
      price: ''
    }],
    category: '',
    talent: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchingListsCategories());
    dispatch(fetchingListsTalents());
  }, [dispatch]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg'
        || e?.target?.files[0]?.type === 'image/png'
        || e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 mb',
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
          status: true,
          type: 'danger',
          message: 'type of image is jpg | png | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        })
      }
    } else if (e.target.name === 'category' || e.target.name === 'talent') {

    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      date: form.date,
      image: form.file,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
    };

    const res = await postData('/cms/events', payload);

    if (res.data.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil menambahkan events ${res.data.data.title}`,
        )
      );
      navigate('/events');
      setIsLoading(false);
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({
      ...form,
      keyPoint: _temp,
    });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push('');

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map((_, i) => {
        return i;
      })
      .indexOf(index);

    _temp.slice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: '',
      status: '',
      stock: '',
      price: '',
    });

    setForm({ ...form, tickets: _temp });
  };

  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map((_, i) => {
        return i;
      })
      .indexOf(index);

    _temp.slice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = [e.target.value];

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <Breadcrumb 
        textSecond={'Events'}
        urlSecond={'/events'}
        textThird={'Create'}
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handleChangeTicket={handleChangeTicket}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
      />
    </Container>
  );
};

export default EventsCreate;
