import React, { Component } from 'react'
import Moment from 'moment'
import { isEmpty } from '../../helpers/isEmpty' //Helper Checks if Object is empty

class User extends Component {
  initialState = {
    fields: {
      gender: 'male',
      dateOfBirth: '',
      ftHeight: '',
      inHeight: '',
      lbsCurrentWeight: '',
      activityLevel: ''
    },
    errors: {}
  }
  state = this.initialState

  handleChange = name => e => {
    const fields = this.state.fields
    fields[name] = e.target.value
    this.setState({ fields })
  }
  // ToDo: Some more validations could be done here
  validation(person) {
    const errors = {}
    if (!person.dateOfBirth || Moment(person.dateOfBirth) > Moment())
      errors.dateOfBirthError = 'Please Enter a Valid Date'
    if (!person.ftHeight) {
      errors.ftHeightError = 'Please Enter a Height in ft.'
    }
    if (!person.inHeight) {
      errors.inHeightError = 'Please enter a Height in in.'
    }
    if (!person.lbsCurrentWeight) {
      errors.lbsCurrentWeightError = 'Please enter your current weight'
    }
    if (!person.activityLevel) {
      errors.activityLevelError = 'Please enter how active you are'
    }
    return errors
  }

  submit = authFunction => {
    console.log('submit')
    const errors = this.validation(this.state.fields)
    if (!isEmpty(errors)) {
      this.setState({ errors })
      return
    }
    const fields = this.state.fields
    // create history and add first weight
    fields.weightHistory = [
      {
        data: fields.lbsCurrentWeight,
        date: Moment().format('YYYY-MM-DD')
      }
    ]
    delete fields.lbsCurrentWeight
    console.log('submit in User')
    console.log(fields)
    authFunction(fields)
  }

  // On Submit Execute both our local submit and the context's change auth to true.
  getSubmitProps = ({ closeForm, onClick, ...props }) => {
    return {
      //re-wiring onClick
      //  onClick -> carries the authentication function from auth.
      //  Set Auths to true and
      onClick: (...args) => {
        console.log('ongetSubmit Props on User', 1 + 1)
        this.submit(onClick)
        //closeForm()
      },
      ...props
    }
  }

  getStateAndHelpers() {
    return {
      fields: this.state.fields,
      errors: this.state.errors,
      handleChange: this.handleChange,
      submit: this.submit,
      getSubmitProps: this.getSubmitProps
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

export default User
