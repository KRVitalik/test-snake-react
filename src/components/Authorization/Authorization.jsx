import React from 'react'
import { useDispatch } from 'react-redux';
import { plyer } from '../../redux/store';
import { MainAuthContainer, RegisterForm, RegisterFormButton, RegisterInput, RegisterLabel } from './Authorization.styled';
import { createPlyer } from '../API_Snake/API_Snake';

const Authorization = () => {

  const dispatch = useDispatch()

  const handleButtonSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: e.currentTarget.elements.name.value,
      password: e.currentTarget.elements.password.value
    }
    const currentPlyer = await createPlyer({...formData, score:0})
    dispatch(plyer(currentPlyer))
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