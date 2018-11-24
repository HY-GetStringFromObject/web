import {
  GET_NODE_ROUTE_ERROR, GET_NODE_ROUTE_REQUEST, GET_NODE_ROUTE_SUCCESS,
  SET_MAP_CENTER
} from './types'

export const setMapCenter = (center) => (dispatch) => {
  dispatch({type: SET_MAP_CENTER, payload: center})
}

export const getNodesRoute = () => async (dispatch) => {
  try {
    dispatch({type: GET_NODE_ROUTE_REQUEST})

    const nodesRoute = [
      {lat: 52.586652, lng: 19.656613},
      {lat: 52.586565, lng: 19.662500}
    ]

    dispatch({type: GET_NODE_ROUTE_SUCCESS, payload: nodesRoute})
  } catch (e) {
    dispatch({type: GET_NODE_ROUTE_ERROR, payload: e})
    throw new Error(e.message)
  }
}
