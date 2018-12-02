import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SimpleLineChart from './SimpleLineChart'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import SimpleTable from './SimpleTable'
import Auth from '../auth/Auth'
import SummaryCard from '../common/SummaryCard'
import { ranges } from './timeRanges'
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

function Goal({ currentWeight, goal }) {
  const percentage = Math.round((currentWeight / goal) * 100)

  return (
    <Fragment>
      <Typography variant="title" gutterBottom>
        To reach your weight goal
      </Typography>
      <Typography variant="title" component="h4" gutterBottom color="primary">
        {percentage}%
      </Typography>
    </Fragment>
  )
}

export function WeightSummaryCard(props) {
  return (
    <Auth.Consumer>
      {({ userInfo: { weightHistory }, weightGoal }) => {
        const currentWeightIndex = weightHistory.length
        const currentWeight = weightHistory[currentWeightIndex - 1].data
        return (
          <SummaryCard
            goalDescription={
              <Goal goal={weightGoal} currentWeight={currentWeight} />
            }
            goal={weightGoal}
            consumed={currentWeight}
          />
        )
      }}
    </Auth.Consumer>
  )
}
class WeightTracker extends Component {
  state = {
    timeRange: ranges[0].value
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <Auth.Consumer>
        {({ userInfo: { weightHistory } }) => {
          return (
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <TextField
                style={{ width: '100%', paddingTop: 10, paddingBottom: 10 }}
                select
                variant="filled"
                value={this.state.timeRange}
                onChange={this.handleChange('timeRange')}
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography component="h4" gutterBottom>
                Weight per Range
              </Typography>
              <Typography component="div" className={classes.chartContainer}>
                <SimpleLineChart
                  weightHistory={weightHistory}
                  timeRange={this.state.timeRange}
                />
              </Typography>
              <Typography variant="h4" gutterBottom>
                Weight Logs
              </Typography>
              <div className={classes.tableContainer}>
                <SimpleTable weightHistory={weightHistory} />
              </div>
            </main>
          )
        }}
      </Auth.Consumer>
    )
  }
}

WeightTracker.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(WeightTracker)
