import React, {Component} from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react'
import connect from 'react-redux/es/connect/connect'
import { getNodesRoute, setMapCenter, postNode, getNodes, deleteNode } from '../../redux/actions'
import colors from '../../assets/colors'
import AddNodeForm from '../../components/addNodeForm'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@material-ui/core/Button/Button'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'

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
    this.state = {
      open: false,
      nodId: 0
    }

    this._onDragend = this._onDragend.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
  }

  async deleteNode () {
    await this.props.deleteNode(this.state.nodId)
    this.setState({open: false})
  }
  handleOpen (nodId) {
    this.setState({
      open: true,
      nodId
    })
  }
  handleClose () {
    this.setState({open: false})
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
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Node Manager'}</DialogTitle>
            <DialogActions>
              <Button onClick={this.deleteNode} color='secondary'>
                Delete node
              </Button>
            </DialogActions>
          </Dialog>
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
                <Marker
                  key={node.nodId}
                  position={node}
                  icon={{
                    url: this.state.nodId === node.nodId ? '/img/markerActive.svg' : '/img/marker.svg'
                  }}
                  onClick={() => this.handleOpen(node.nodId)} />
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
  getNodes,
  deleteNode
})(GoogleMap)
