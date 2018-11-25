import React, { Component } from 'react'

import MapContainer from './Map/index'
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
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={MapContainer} />
        </Switch>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps, {
  push
})(App))
