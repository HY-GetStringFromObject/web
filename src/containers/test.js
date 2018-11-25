import React, { Component } from 'react'
import AddNodeForm from '../components/addNodeForm'
import styled from 'styled-components'

const Box = styled.div`
  width: 500px;
  height: 500px;
`

class MapContainer extends Component {
  render () {
    return (
      <Box>
        <AddNodeForm />
      </Box>
    )
  }
}

export default MapContainer
