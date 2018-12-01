import React, { Component } from 'react'
import Auth from '../auth/Auth'
import classNames from 'classnames'
import Moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { activityRange, heightFtRange, heightInRange } from './FormOptions' // Selectors to fill in form field
import { isEmpty } from '../../helpers/isEmpty' //Helper Checks if Object is empty

const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 5
  },
  margin: {
    display: 'flex',
    margin: theme.spacing.unit
  },

  textField: {
    flexBasis: '100%'
  },
  subTextField: {
    flexBasis: '40%'
  }
})

class DialogForm extends Component {
  initialState = {
    fields: {
      gender: 'male',
      dateOfBirth: '',
      ftHeight: '',
      inHeight: '',
      lbsCurrentWeight: '',
      activityLevel: ''
    },
    fieldErrors: {},
    open: true
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
  // Close Dialog
  close = () => {
    this.setState({ open: false })
  }

  submit = authFunction => {
    const fieldErrors = this.validation(this.state.fields)
    if (!isEmpty(fieldErrors)) {
      this.setState({ fieldErrors })
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
    authFunction(fields)
    this.close()
  }

  // On Submit Execute both our local submit and the context's change auth to true.
  getSubmitProps = ({ onClick, ...props }) => {
    return {
      //re-wiring onClick
      onClick: () => {
        this.submit(onClick)
      },
      ...props
    }
  }

  render() {
    const {
      state: {
        fields: {
          gender,
          dateOfBirth,
          ftHeight,
          inHeight,
          lbsCurrentWeight,
          activityLevel
        },
        open,
        fieldErrors: {
          dateOfBirthError,
          ftHeightError,
          inHeightError,
          lbsCurrentWeightError,
          activityLevelError
        }
      },
      props: { classes },
      handleChange,
      getSubmitProps
    } = this

    return (
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Your Settings</DialogTitle>
        <DialogContent>
          Remember to "Save Settings" before you leave the page. We are going
          cook up the perfect formula for your diet!
        </DialogContent>
        <Paper className={classNames(classes.root)}>
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleChange('gender')}
            >
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            id="date"
            label="Date of Birth"
            error={dateOfBirthError ? true : false}
            helperText={dateOfBirthError}
            fullWidth
            value={dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            InputLabelProps={{ shrink: true }}
            className={classNames(classes.margin, classes.textField)}
            type="date"
          />

          <TextField
            select
            label="Height ft"
            error={ftHeightError ? true : false}
            helperText={ftHeightError}
            className={classNames(classes.margin, classes.subTextField)}
            value={ftHeight}
            onChange={handleChange('ftHeight')}
            InputProps={{
              endAdornment: <InputAdornment position="end">in</InputAdornment>
            }}
          >
            {heightFtRange.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Height in"
            error={inHeightError ? true : false}
            helperText={inHeightError}
            className={classNames(classes.margin, classes.subTextField)}
            value={inHeight}
            onChange={handleChange('inHeight')}
            InputProps={{
              endAdornment: <InputAdornment position="end">in</InputAdornment>
            }}
          >
            {heightInRange.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="weight"
            label="Current Weight"
            error={lbsCurrentWeightError ? true : false}
            helperText={lbsCurrentWeightError}
            InputLabelProps={{ shrink: true }}
            className={classNames(classes.margin, classes.textField)}
            type="number"
            value={lbsCurrentWeight}
            onChange={handleChange('lbsCurrentWeight')}
            InputProps={{
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>
            }}
          />

          <TextField
            select
            label="Activity Level"
            error={activityLevelError ? true : false}
            helperText={activityLevelError}
            className={classNames(classes.margin, classes.textField)}
            value={activityLevel}
            onChange={handleChange('activityLevel')}
          >
            {activityRange.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DialogActions>
            <Auth.Consumer>
              {({ authenticate }) => (
                <Button
                  {...getSubmitProps({
                    onClick: authenticate,
                    id: 'custom-button-id'
                  })}
                >
                  Save Settings
                </Button>
              )}
            </Auth.Consumer>
          </DialogActions>
        </Paper>
      </Dialog>
    )
  }
}

export default withStyles(styles)(DialogForm)
