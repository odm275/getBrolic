import React from 'react'
import CalorieCounter from './CalorieCounter'
import DataSelect from './DateSelect'
import SummaryCard from '../common/SummaryCard'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
})

//  Last Weight in History
function Logistics() {
  return (
    <CalorieCounter>
      <Typography>
        *insert pounds up or down* of progress: 137 lbs
        <span>Current Weight</span>
        <span>Edit</span>
      </Typography>
    </CalorieCounter>
  )
}

//  Consummed is going be the calories consummed that day.
//  Calories Left: BMR - Consummed
function Goal({ BMR, caloriesConsumedThisDay }) {
  return (
    <div className="goal">
      <Typography variant="h2" gutterBottom>
        Calories Left
      </Typography>
      <Typography component="h2" variant="h2" color="primary">
        {BMR - caloriesConsumedThisDay}
      </Typography>
      <Typography variant="h2" gutterBottom>
        Calories Consummed
      </Typography>
      <Typography component="h2" variant="h2" color="primary">
        {caloriesConsumedThisDay}
      </Typography>
    </div>
  )
}

export function CaloriesSummaryCard() {
  return (
    <CalorieCounter>
      {props => {
        return (
          <SummaryCard
            size={400}
            goal={props.BMR}
            consumed={props.caloriesConsumedThisDay}
            logistics={Logistics}
            goalDescription={<Goal {...props} />}
          />
        )
      }}
    </CalorieCounter>
  )
}

function CaloriesDashboard(props) {
  const { classes } = props
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <DataSelect {...props} />
      <CaloriesSummaryCard />
    </main>
  )
}

export default withStyles(styles)(CaloriesDashboard)
