import React, {Component} from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'
import { getNodesRoute, setMapCenter, postNode, getNodes } from '../../redux/actions'
import colors from '../../assets/colors'
import AddNodeForm from '../../components/addNodeForm'

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
  background-color: ${colors.alizarin}
  border-radius: 50%;
  z-index: 100;
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

class NodeSetup extends Component {
  constructor (props) {
    super(props)

    this._onDragend = this._onDragend.bind(this)
  }

  componentDidMount () {
    this.props.getNodes()
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
      <div>
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
              strokeColor={colors.peterRiver}
              strokeOpacity={0.8}
              strokeWeight={4} />
            {this.props.map.nodes.map(node => {
              return (
                <Marker key={node.nodId} position={node} />
              )
            }
            )}
          </Map>
        </Container>
        <FormWrapper>
          <FormContainer>
            <AddNodeForm onAdd={this.props.postNode} />
          </FormContainer>
        </FormWrapper>
      </div>
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
})(NodeSetup)

export default connect(mapStateToProps, {
  getNodesRoute,
  setMapCenter,
  postNode,
  getNodes
})(GoogleMap)
