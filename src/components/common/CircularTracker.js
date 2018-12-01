import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

//We need state
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})
const calculateProgress = (goal, consumed) => {
  //BMR is 100%
  return Math.round((consumed / goal) * 100)
}
//  Need BMR and calories

function CircularTracker({ classes, goal, consumed }) {
  return (
    <div className="CircularTracker">
      <CircularProgress
        size={200}
        className={classes.progress}
        variant="static"
        value={calculateProgress(goal, consumed)}
      />
    </div>
  )
}

CircularTracker.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CircularTracker)
