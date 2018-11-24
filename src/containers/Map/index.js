import React, {Component} from 'react'
// import styled from 'styled-components'
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'
import { getNodesRoute, setMapCenter } from '../../redux/actions'

// const Container = styled.div``

const mapStyles = {
  width: '100%',
  height: '100%'
}

class MapContainer extends Component {
  constructor (props) {
    super(props)

    this._onDragend = this._onDragend.bind(this)
  }
  async componentDidMount () {
    await this.props.getNodesRoute()
  }

  _onDragend (mapProps, map) {
    const center = {
      lat: map.center.lat(),
      lng: map.center.lng()
    }
    this.props.setMapCenter(center)
  }

  render () {
    return (
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
          strokeWeight={2} />
      </Map>
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
})(MapContainer)

export default connect(mapStateToProps, {
  getNodesRoute,
  setMapCenter
})(GoogleMap)
