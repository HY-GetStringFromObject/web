import React, { Component } from 'react'
import NodeSetup from './NodeSetup/index'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  constructor (props) {
    super(props)

    this._pressButton = this._pressButton.bind(this)
  }

  _pressButton () {
    this.props.push('/bob')
  }

  render () {
    return (
      <Switch>
        <Route exact path='/node' component={NodeSetup} />
        <Route exact path='/routes' component={NodeSetup} />
      </Switch>
    )
  }
}
const mapStateToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps, {
  push
})(App))
