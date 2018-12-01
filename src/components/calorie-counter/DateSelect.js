import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, Popover, TextField } from '@material-ui/core'
import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
})

class DateSelect extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    const { currentDate, changeDate } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <CalendarToday />
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <form noValidate>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              onChange={changeDate}
              value={currentDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Popover>
      </div>
    )
  }
}

DateSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DateSelect)
