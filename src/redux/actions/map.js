import { GET_NODE_ROUTE_ERROR, GET_NODE_ROUTE_REQUEST, GET_NODE_ROUTE_SUCCESS } from './types'

export const getNodesRoute = () => async (dispatch) => {
  try {
    dispatch({type: GET_NODE_ROUTE_REQUEST})

    const nodesRoute = [
      {lat: 52.586662, lng: 19.656450},
      {lat: 52.586646, lng: 19.662462}
    ]

    dispatch({type: GET_NODE_ROUTE_SUCCESS, payload: nodesRoute})
  } catch (e) {
    dispatch({type: GET_NODE_ROUTE_ERROR, payload: e})
    throw new Error(e.message)
  }
}
