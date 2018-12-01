import React, { Component } from 'react'

class DialogController extends Component {
  initialState = {
    value: '',
    open: false
  }

  state = this.initialState

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    //Execute Auth and Local Close/Clearing.
  }

  getSubmitProps = ({ onClick, ...props }) => {
    return {
      //re-wiring onSubmit click
      onClick: (...args) => {
        onClick && onClick(...args)
        this.handleClose()
      },
      ...props
    }
  }

  render() {
    return this.props.children({
      open: this.state.open,
      value: this.state.value,
      clickOpen: this.handleClickOpen,
      handleChange: this.handleChange,
      close: this.handleClose,
      getSubmitProps: this.getSubmitProps
    })
  }
}

export default DialogController
