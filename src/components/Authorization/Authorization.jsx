import React from 'react'
import { useDispatch } from 'react-redux';
import { plyer } from '../../redux/store';
import { MainAuthContainer, RegisterForm, RegisterFormButton, RegisterInput, RegisterLabel } from './Authorization.styled';

const Authorization = () => {

  const dispatch = useDispatch()

  const handleButtonSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: e.currentTarget.elements.name.value,
      password: e.currentTarget.elements.password.value
    }
    dispatch(plyer(formData))
    e.target.reset()
  }

  return (
    <MainAuthContainer>
      <RegisterForm onSubmit={handleButtonSubmit}>
        <RegisterLabel >Enter your name
          <RegisterInput placeholder='Name' type="text" name='name' />
        </RegisterLabel>
        <RegisterLabel>Enter your Password
          <RegisterInput placeholder='Password' type="password" name='password' />
        </RegisterLabel>
        <RegisterFormButton type='submit'>Play</RegisterFormButton>
      </RegisterForm>
    </MainAuthContainer>
  )
};

export default Authorization