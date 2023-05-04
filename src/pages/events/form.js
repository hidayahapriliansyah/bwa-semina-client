import React from 'react';
import {
  CloseButton,
  Col,
  Figure,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SelectBox from '../../components/SelectBox';
import { config } from '../../configs';

export default function EventsForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  handlePlusKeyPoint,
  handleChangeKeyPoint,
  handleMinusKeyPoint,
  handlePlusTicket,
  handleMinusTicket,
  hangleChangeTicket,
}) {
  return (
    <Form className='mb-2'>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukkan judul'}
            label={'Judul'}
            name={'title'}
            value={form.title}
            type='text'
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukkan tagline'}
            label={'Tagline'}
            name={'tagline'}
            value={form.tagline}
            type='text'
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukkan tanggal acara'}
            label={'Tanggal'}
            name={'date'}
            value={form.tanggal}
            type='datetime-local'
            onChange={handleChange}
          />
        </Col>
        <SelectBox
          label={'Category'}
          placeholder={'Masukkan kategori'}
          name={'category'}
          value={form.category}
          options={lists.categories}
          isClearable={true}
          handleChange={(e) => handleChange(e)}
        />
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukkan about'}
            label={'About'}
            name={'about'}
            value={form.about}
            type={'text'}
            onChange={handleChange}
          />
          <TextInputWithLabel
            placeholder={'Masukkan tempat acara'}
            label={'Tempat Acara'}
            name={'venueName'}
            value={form.venueName}
            type={'text'}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Form.Label>Key Point</Form.Label>
      <Row>
        {form.keyPoint.map((key, index) => (
            <Col sm={6} key={index}>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Masukkan keypoint'
                  value={key}
                  type={'text'}
                  name='key'
                  onChange={(e) => {
                    handleChangeKeyPoint(e, index);
                  }}
                />
              {index !== 0  && (
                <InputGroup.Text id='basic-addon2'>
                  <CloseButton onClick={() => handleMinusKeyPoint(index)} />
                </InputGroup.Text>
              )}
              </InputGroup>
            </Col>
        ))}
      </Row>
      <div className='mb-3'>
        <Button variant={'success'} action={handlePlusTicket} size={'sm'}>
          Tambah Ticket
        </Button>
      </div>

      <Button variant={'primary'} action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
};