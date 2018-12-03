import React, { Component } from 'react'
import Auth from '../auth/Auth'
import classNames from 'classnames'
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
import { activityRange, heightFtRange, heightInRange } from './formOptions' // Selectors to fill in form field
import User from './User'

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

function FormSubmitButton({ closeForm }) {
  //closeDialog()
  return (
    <Auth.Consumer>
      {({ authenticate }) => (
        <User>
          {({ getSubmitProps }) => (
            <Button
              {...getSubmitProps({
                onClick: authenticate,
                closeForm: closeForm,
                id: 'custom-button-id'
              })}
            >
              Save Settings
            </Button>
          )}
        </User>
      )}
    </Auth.Consumer>
  )
}

class Form extends Component {
  state = {
    open: true
  }
  // Close Dialog
  close = () => {
    this.setState({ open: false })
  }
  render() {
    const {
      state: { open },
      props: { classes }
    } = this
    return (
      <User>
        {({
          handleChange,
          fields: {
            gender,
            dateOfBirth,
            ftHeight,
            inHeight,
            lbsCurrentWeight,
            activityLevel
          },
          errors: {
            dateOfBirthError,
            ftHeightError,
            inHeightError,
            lbsCurrentWeightError,
            activityLevelError
          }
        }) => {
          console.log(dateOfBirthError)
          return (
            <Dialog open={open} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Your Settings</DialogTitle>
              <DialogContent>
                Remember to "Save Settings" before you leave the page. We are
                going cook up the perfect formula for your diet!
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
                    endAdornment: (
                      <InputAdornment position="end">in</InputAdornment>
                    )
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
                    endAdornment: (
                      <InputAdornment position="end">in</InputAdornment>
                    )
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
                    endAdornment: (
                      <InputAdornment position="end">lbs</InputAdornment>
                    )
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
                  <FormSubmitButton closeForm={this.close} />
                </DialogActions>
              </Paper>
            </Dialog>
          )
        }}
      </User>
    )
  }
}

export default withStyles(styles)(Form)
