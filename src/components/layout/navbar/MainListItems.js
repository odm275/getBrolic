import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalorieCounterIcon from "@material-ui/icons/Restaurant";
import WeightTrackerIcon from "@material-ui/icons/NoteAddSharp";

//  Want to match each route to the right secondary menu(listitems):

export default function mainListItems(props) {
  return (
    <Fragment>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/calorie-counter">
        <ListItem button>
          <ListItemIcon>
            <CalorieCounterIcon />
          </ListItemIcon>
          <ListItemText primary="Calorie Counter" />
        </ListItem>
      </Link>
      <Link to="weight-tracker">
        <ListItem button>
          <ListItemIcon>
            <WeightTrackerIcon />
          </ListItemIcon>
          <ListItemText primary="Weight Tracker" />
        </ListItem>
      </Link>
    </Fragment>
  );
}
