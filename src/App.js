import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/input'

export default function App() {
  const formRef = useRef(null);

  async function handleSubmit(formData, { reset }) {
    
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No minimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      });

      await schema.validate(formData, {
        abortEarly: false,
      })

      console.log(formData);

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        console.log(err);

        const ValidationError = {}

        err.inner.forEach(error => {
          ValidationError[error.path] = error.message;
        });

        formRef.current.setErrors(ValidationError);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Bruno Kennedy',
        email: 'email@email.com',
        address: {
          city: 'Mossoró'
        }
      })
    }, 2000);
  }, [])

  return (
    <div className="App">
      <h1>Use unform web!</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email" />
        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}
