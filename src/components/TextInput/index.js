import React from 'react';
import Form from 'react-bootstrap/Form';

function TextInput({ name, value, type, onChange, placeholder }) {
  return (
    <Form.Control
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
};

export default TextInput;
