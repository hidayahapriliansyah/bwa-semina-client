import Form from 'react-bootstrap/Form';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SButton from '../../components/Button';

export default function SForm({ isLoading, form, handleChange, handleSubmit }) {
  return (
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
  )
};
