import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Form from '../user-form/Form'
import Auth from '../auth/Auth'
import { CaloriesSummaryCard } from '../calorie-counter/CaloriesDashboard'
import { WeightSummaryCard } from '../weight-tracker/WeightTracker'
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

class Dashboard extends Component {
  render() {
    const { classes } = this.props
    return (
      <Auth.Consumer>
        {({ isAuth }) => {
          return isAuth ? (
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <CaloriesSummaryCard />
                <WeightSummaryCard />
              </div>
            </main>
          ) : (
            <Form />
          )
        }}
      </Auth.Consumer>
    )
  }
}

export default withStyles(styles)(Dashboard)
