import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
// import { MemoryRouter as Router } from "react-router";
import { HashRouter as Router, Link as RouterLink, Switch, Route, } from "react-router-dom";
import Link from "@material-ui/core/Link";
import React from "react";
import Patient from "../Pages/Patient";
import Study from "../Pages/Study";

/**
 * @author
 * @function Header
 **/

const useStyles = makeStyles((theme) => ({
  linkItem:{
    margin: theme.spacing(2),
    alignSelf: 'flex-end',
    '& :hover':{
      textDecoration: 'none',
    }
  }
}))

const Header = (props) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant='h5'>Study Viewer App</Typography>        
          <Typography color="inherit" className={classes.linkItem}>
            <Link component={RouterLink} to="/" color='inherit'>
              Study
            </Link>
          </Typography>
          <Typography color="inherit" className={classes.linkItem}>        
            <Link component={RouterLink} to="/patient" color='inherit'>
              Patient 
            </Link>
          </Typography>          
      </Toolbar>
    </AppBar>
  );
};

export default Header;
