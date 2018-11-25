import React, { Component } from 'react'
import SegmentSetup from './SegmentSetup'
import NodeSetup from './NodeSetup'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FindRoute from './FindRoute'

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
          <Route exact path='/segment' component={SegmentSetup} />
          <Route exact path='/node' component={NodeSetup} />
          <Route exact path='/' component={FindRoute} />
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
