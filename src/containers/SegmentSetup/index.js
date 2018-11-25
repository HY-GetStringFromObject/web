import React, {Component} from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'

import SegmentForm from '../Dialogs/segmentForm'
import { getNodes, setMapCenter, setSegment } from '../../redux/actions'

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
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

  componentDidMount () {
    // this.props.getNodes()
  }

  _setNode (node) {
    const nodes = this.state.nodes

    nodes.push(node)

    this.setState({nodes})

    if (this.state.nodes.length === 1) {
    } else if (this.state.nodes[0] === this.state.nodes[1]) {
      this.setState({nodes: []})
    } else {
      this.props.setSegment(this.state.nodes)
      this._toggleDialog()
      this.setState({nodes: []})
    }
  }

  _toggleDialog () {
    this.setState({open: !this.state.open})
  }

  render () {
    return (
      <Container>
        <SegmentForm
          open={this.state.open}
          onClose={this._toggleDialog}
        />
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
        </Map>
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
  setSegment
})(GoogleMap)
