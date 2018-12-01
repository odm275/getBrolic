import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import CircularTracker from './CircularTracker'
const styles = theme => ({
  root: {
    width: 400
  },
  marginTop: {
    marginTop: theme.spacing.unit
  }
})
//  We want SummaryCard to be flexible ... going be re used alot.
//  <SummaryCard logistics goal/> Will always contain a tracker

function SummaryCard({
  logistics,
  goalDescription,
  goal,
  consumed,
  classes,
  size
}) {
  return (
    <Paper style={{ width: size }}>
      <Grid container justify="space-evenly">
        <Grid container xs={12} sm={6} lg={4} direction="column">
          <Grid item className={classes.marginTop}>
            {logistics}
          </Grid>
          <Grid item className={classes.marginTop}>
            {goalDescription}
          </Grid>
        </Grid>
        <CircularTracker goal={goal} consumed={consumed} />
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(SummaryCard)
