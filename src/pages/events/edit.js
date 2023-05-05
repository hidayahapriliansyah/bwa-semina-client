import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Breadcrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import { getData, postData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import Form from './form';
import {
  fetchingListsCategories,
  fetchingListsTalents,
} from '../../redux/lists/actions';

function EventsEdit() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const [form, setForm] = useState({
    title: '',
    price: '',
    date: '',
    file: '',
    avatar: '',
    about: '',
    venueName: '',
    tagline: '',
    keyPoint: [''],
    tickets: [
      {
        type: '',
        status: '',
        stock: '',
        price: '',
      },
    ],
    category: '',
    talent: '',
    stock: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneCategories = async () => {
    console.log('fetchOneCategories');
    const res = await getData(`/cms/events/${eventId}`);

    setForm({
      ...form,
      title: res.data.data.title,
      date: moment(res.data.data.date).format('YYYY-MM-DDTHH:SS'),
      file: res.data.data.image._id,
      avatar: res.data.data.image.name,
      about: res.data.data.about,
      venueName: res.data.data.venueName,
      tagline: res.data.data.tagline,
      keyPoint: res.data.data.keyPoint,
      category: {
        label: res?.data?.data?.category?.name,
        target: { name: 'category', value: res?.data?.data?.category?._id },
        value: res?.data?.data?.category?._id,
      },
      talent: {
        label: res?.data?.data?.talent?.name,
        target: { name: 'talent', value: res?.data?.data?.talent?._id },
        value: res?.data?.data?.talent?._id,
      },
      tickets: res.data.data.tickets,
    });
  };
  
  useEffect(() => {
    fetchOneCategories();
  }, []);

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
    if (
      e?.target?.files[0]?.type === 'image/jpg'
      || e?.target?.files[0]?.type === 'image/jpeg'
      || e?.target?.files[0]?.type === 'image/png'
    ) {
      var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

      if (size > 2) {
        setAlert({
          status: true,
          type: 'danger',
          message: 'Please select image size less than 3 MB',
        });
        setForm({
          ...form,
          file: '',
          [e.targe.name]: '',
        });
      } else if (e.target.name === 'category' || e.target.name === 'talent') {
        setForm({ ...form, [e.target.name]: e });
      } else {
        const res = await uploadImage(e.target.files[0]);

        setForm({
          ...form,
          file: res.data.data.image._id,
          [e.target.name]: res.data.data.name,
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      data: form.date,
      image: form.image,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      // kuanaon make value
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
    };

    const res = await putData(`/cms/events/${eventId}`, payload);
    if (res.data.data) {
      dispatch(
        setNotif(true, 'success', `berhasil ubah event ${res.data.data.title}`)
      );
      setIsLoading(false)
      navigate('/events');
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp})
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

    _temp.splice(removeIndex, 1);
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
      
    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <Breadcrumb
        textSecond={'Events'}
        urlSecond={'/events'}
        textThird={'Edit'}
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
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
      />
    </Container>
  );
};

export default EventsEdit;
