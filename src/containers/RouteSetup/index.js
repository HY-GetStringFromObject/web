import React, {Component} from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'
import { getNodesRoute, setMapCenter } from '../../redux/actions'

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const NodeSelector = styled.div`
  height: 10px;
  width: 10px;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 100;
`

const mapStyles = {
  width: '100%',
  height: '100%'
}

class RouteSetup extends Component {
  constructor (props) {
    super(props)

    this._onDragend = this._onDragend.bind(this)
  }

  componentDidMount () {
    this.props.getNodes()
  }

  render () {
    return (
      <Container>
        <NodeSelector />
        <Map
          onDragend={this._onDragend}
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 52.589319,
            lng: 19.668488
          }}
        >
          <Polyline
            path={this.props.map.nodesRoute}
            strokeColor='#0000FF'
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          {this.props.map.nodes.map(node => {
            return (
              <Marker position={node} />
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
})(RouteSetup)

export default connect(mapStateToProps, {
  getNodesRoute,
  setMapCenter
})(GoogleMap)