import React from 'react';
import { Figure, Form } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { config } from '../../configs';

export default function SpeakersForm({
  handleSubmit,
  handleChange,
  form,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel 
        placeholder={'Masukkan nama pembicara'}
        name='name'
        label={'Nama'}
        value={form.name}
        type={'text'}
        onChange={handleChange}
      />
      <TextInputWithLabel 
        placeholder={'Masukkan role'}
        name='role'
        label={'Role'}
        value={form.role}
        type={'text'}
        onChange={handleChange}
      />
      <TextInputWithLabel 
        placeholder={'Masukkan avatar'}
        name='avatar'
        label={'Avatar'}
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
          </Figure>
        </div>
      )}
      <Button variant={'primary'} action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
};