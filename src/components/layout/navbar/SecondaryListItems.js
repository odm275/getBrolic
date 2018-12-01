import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Auth from "../../auth/Auth";
import DialogController from "../../user-form/DialogController";
import { toCamelCase } from "../../../helpers/camelCase";

function WeightTrackerMenu() {
  return (
    <DialogController>
      {({ close, clickOpen, open, value, getSubmitProps, handleChange }) => {
        return (
          <Fragment>
            <ListItem button onClick={clickOpen}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Log Weight" />
            </ListItem>
            <Dialog
              open={open}
              onClose={close}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Log</DialogTitle>
              <DialogContent>
                <DialogContentText>Please enter in lbs</DialogContentText>
                <TextField
                  value={value}
                  type="number"
                  onChange={handleChange}
                  label="Enter lbs"
                  autoFocus
                  margin="dense"
                  id="weight"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={close} color="primary">
                  Cancel
                </Button>
                <Auth.Consumer>
                  {({ addWeightHistory }) => (
                    <Button
                      {...getSubmitProps({
                        onClick: () => addWeightHistory(value)
                      })}
                      id="submit"
                      color="primary"
                    >
                      Log Weight
                    </Button>
                  )}
                </Auth.Consumer>
              </DialogActions>
            </Dialog>
          </Fragment>
        );
      }}
    </DialogController>
  );
}

function CalorieCounterMenu() {
  return (
    <DialogController>
      {({ close, clickOpen, open, value, getSubmitProps, handleChange }) => {
        return (
          <Fragment>
            <ListItem button onClick={clickOpen}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Quick Log" />
            </ListItem>
            <Dialog
              open={open}
              onClose={close}
              aria-labelledby="form-dialog-calorielog"
            >
              <DialogTitle id="form-dialog-title">Log</DialogTitle>
              <DialogContent>
                <DialogContentText>Please amt of calories</DialogContentText>
                <TextField
                  onChange={handleChange}
                  autoFocus
                  margin="dense"
                  id="calorie"
                  label="calorie"
                  type="number"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={close} color="primary">
                  Cancel
                </Button>
                <Auth.Consumer>
                  {({ addCaloriesHistory }) => (
                    <Button
                      {...getSubmitProps({
                        onClick: () => addCaloriesHistory(value)
                      })}
                      color="primary"
                    >
                      Log Calories
                    </Button>
                  )}
                </Auth.Consumer>
              </DialogActions>
            </Dialog>
          </Fragment>
        );
      }}
    </DialogController>
  );
}

const Menus = {
  weightTracker: <WeightTrackerMenu />,
  calorieCounter: <CalorieCounterMenu />
};

// Match the corresponding tab to the correct menu.
export default withRouter(function SecondaryListItems({
  location: { pathname }
}) {
  const pathId = toCamelCase(pathname);
  return (
    <Fragment>
      <ListSubheader inset>Options</ListSubheader>
      {Menus[pathId]}
    </Fragment>
  );
});
