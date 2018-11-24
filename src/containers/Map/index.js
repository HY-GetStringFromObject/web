import React, {Component} from 'react'
// import styled from 'styled-components'
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'
import { getNodesRoute } from '../../redux/actions'

// const Container = styled.div``

const mapStyles = {
  width: '100%',
  height: '100%'
}

class MapContainer extends Component {
  async componentDidMount () {
    await this.props.getNodesRoute()
  }

  render () {
    return (
      <Map
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
  getNodesRoute
})(GoogleMap)
