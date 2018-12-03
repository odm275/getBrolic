import React from 'react'
import ReactDOM from 'react-dom'
import { generate } from 'til-client-test-utils'
import DialogForm from '../user-form/DialogForm'
import { render, Simulate } from 'react-testing-library'

//SAVE SETTINGS
test('calls submit with each field when submitted', () => {
  const fakeUserInfo = generate.loginForm()
  const handleSaveSettings = jest.fn()

  const div = document.createElement('div')
  const { container, getByLabelText, getByText } = render(<DialogForm />)
})
