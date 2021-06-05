import { makeStyles } from '@material-ui/core';
import React from 'react'
import Header from '../Components/Header';
import Patient from '../Pages/Patient';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Study from '../Pages/Study';

const useStyles = makeStyles((theme)=>({
  appMain:{
    // paddingLeft:320,    
    margin: '0 auto',
  },
  container:{
    maxWidth: 980,
    margin: theme.spacing(2, 'auto')
  }
}))

function App() {
  const classes = useStyles()
  return (
    <>    
    <div className={classes.appMain}>
      <Router>
        <Header />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/">
              <Study />
            </Route>
            <Route exact path="/patient">
              <Patient />
            </Route>          
          </Switch>
        </div>        
      </Router>
      
    </div>
    </>
  );
}

export default App;
