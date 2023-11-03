import React from 'react'
import { useDispatch } from 'react-redux';
import { plyer } from '../../redux/store';

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
    <div>
      <form onSubmit={handleButtonSubmit}>
        <label >
          <input placeholder='Name' type="text" name='name' />
        </label>
        <label>
          <input placeholder='Password' type="password" name='password' />
        </label>
        <button type='submit'>Play</button>
    </form>
    </div>
  )
};

export default Authorization