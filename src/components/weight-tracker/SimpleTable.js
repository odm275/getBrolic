import React from 'react'
import Auth from '../auth/Auth'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  }
}

function SimpleTable(props) {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Weight (lbs)</TableCell>
            <TableCell numeric>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.weightHistory.map((entry, i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {entry.data}
                </TableCell>
                <TableCell numeric>{entry.date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
