import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from './Profile'
import Header from './Header'

class App extends Component {
  // <Route exact path="/user/:name" component={CreateLink} />

  render() {
    return (
      <div >
        <Header />
       <div>
         <Switch>
           <Route exact path="/" component={Profile} />
         </Switch>
         </div>
      </div>
    )
  }
}

export default App
