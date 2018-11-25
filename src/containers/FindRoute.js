import React, {Component} from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'

import { getNodes, setMapCenter, setSegment, getRoute, getSegments } from '../redux/actions'
import colors from '../assets/colors'
import ResetRoute from '../components/resetRoute'

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.div`
  width: 300px;
  z-index: 1000;
`

const mapStyles = {
  width: '100%',
  height: '100%'
}

class SegmentSetup extends Component {
  constructor (props) {
    super(props)

    this._setNode = this._setNode.bind(this)
    this._toggleDialog = this._toggleDialog.bind(this)

    this.state = {
      nodes: [],
      open: false
    }
  }

  async componentDidMount () {
    this.props.getNodes()
  }

  _setNode (node) {
    const nodes = this.state.nodes

    nodes.push(node)

    this.setState({nodes})

    if (this.state.nodes.length === 1) {
    } else if (this.state.nodes[0] === this.state.nodes[1]) {
      this.setState({nodes: []})
    } else {
      this.props.getRoute(this.state.nodes.map(node => node.nodId))
      this.setState({nodes: []})
    }
  }

  _toggleDialog () {
    this.setState({open: !this.state.open})
  }

  render () {
    return (
      <Container>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 52.589319,
            lng: 19.668488
          }}
        >
          {this.props.map.nodes.map(node => {
            return (
              <Marker key={node.nodId} position={node} onClick={() => this._setNode(node)} />
            )
          }
          )}
          {this.props.map.route.length ? <Polyline
            path={this.props.map.route}
            strokeColor={colors.peterRiver}
            strokeOpacity={0.8}
            strokeWeight={4} /> : null}
        </Map>
        <FormWrapper>
          <FormContainer>
            <ResetRoute onReset={this.props.getNodes} />
          </FormContainer>
        </FormWrapper>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map
  }
}

const GoogleMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(SegmentSetup)

export default connect(mapStateToProps, {
  getNodes,
  setMapCenter,
  setSegment,
  getRoute,
  getSegments
})(GoogleMap)
