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
      <Typography variant="title" component="h3" gutterBottom>
        Calories Left
      </Typography>
      <Typography variant="title" component="h3" gutterBottom color="primary">
        {BMR - caloriesConsumedThisDay}
      </Typography>
      <Typography variant="title" component="h3" gutterBottom>
        Calories Consummed
      </Typography>
      <Typography variant="title" component="h3" gutterBottom color="primary">
        {caloriesConsumedThisDay}
      </Typography>
    </div>
  )
}

export function CaloriesSummaryCard() {
  return (
    <CalorieCounter>
      {({ BMR, caloriesConsumedThisDay }) => {
        return (
          <SummaryCard
            size={400}
            goal={BMR}
            consumed={caloriesConsumedThisDay}
            logistics={Logistics}
            goalDescription={
              <Goal
                BMR={BMR}
                caloriesConsumedThisDay={caloriesConsumedThisDay}
              />
            }
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
