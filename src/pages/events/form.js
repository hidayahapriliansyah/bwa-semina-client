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
  handleChangeTicket,
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

      {/* Keypoints  */}
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

      <Button variant={'success'} action={handlePlusKeyPoint}>
        Tambah keypoint
      </Button>

      <Row>
        <Col>
          <SelectBox 
            label={'Speaker'}
            placeholder={'Masukkan pembicara'}
            name='talent'
            value={form.talents}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukkan avatar'}
            label={'Cover'}
            name={'avatar'}
            // value={form.avatar}
            type={'file'}
            onChange={handleChange}
          />
          {form.avatar !== '' && (
            <div>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt='171x180'
                  src={`${config.api_image}/${form.avatar}`}
                />
                <Figure.Caption>Preview image avatar</Figure.Caption>
              </Figure>
            </div>
          )}
        </Col>
      </Row>

      {/* Tickets */}
      <Form.Label>Tiket</Form.Label>
      {form.tickets.map((tic, index) => (
        <Row>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={'Masukkan type ticket'}
              label={'Type'}
              name={'type'}
              value={tic.type}
              type='text'
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={'Masukkan harga tiket'}
              label={'Harga'}
              name={'price'}
              value={tic.price}
              type='number'
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={'Masukkan stock tiket'}
              label={'Stock'}
              name={'stock'}
              value={tic.stock}
              type='number'
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={index !== 0 ? 5 : 6}>
            <TextInputWithLabel
              placeholder={'Masukkan status'}
              label={'Status'}
              name={'status'}
              value={tic.status}
              type='text'
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          {!index !== 0 && (
            <Col
              sm={1}
              className='d-flex justify-content-end align-items-center'
            >
              <CloseButton onClick={() => handleMinusTicket(index)}/>
            </Col>
          )}
        </Row>
      ))}
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