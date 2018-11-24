import React, {Component} from 'react'
// import styled from 'styled-components'
import { Map, GoogleApiWrapper } from 'google-maps-react'

// const Container = styled.div``

const mapStyles = {
  width: '100%',
  height: '100%'
}

class MapContainer extends Component {
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
      />
    )
  }
}

console.log(process.env)
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
