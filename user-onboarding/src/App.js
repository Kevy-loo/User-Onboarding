import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'
import schema from './valid/Schema'
import UserForm from './UserForm';
import UserCard from './UserCard';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  termsOfService: false,

}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
}
const initialUser = []
const initialDisabled = true

function App() {

  const [user, setUser] = useState(initialUser)         
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)      

  const getUser = () => {

    axios.get(`https://reqres.in/api/users`)
    .then(resp => {
      setUser(resp.data.data);

    }).catch(err => console.error(err))
  }

  const postNewUser = newUser => {

    axios.post('https://reqres.in/api/users', newUser)
    .then(resp => {
      setUser([resp.data, ...user])

    }).catch(err => console.error(err))
    .finally(() => setFormValues(initialFormValues))
  }
  
  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
 
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
      tos: ['tos'].filter((tos) => !!formValues[tos]),



    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        user.map(user => {
          return (
            <UserCard key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}
export default App;
