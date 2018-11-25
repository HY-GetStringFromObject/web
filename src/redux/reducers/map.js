import {
  DELETE_NODE_SUCCESS,
  GET_NODE_ROUTE_SUCCESS,
  GET_NODE_SUCCESS,
  POST_NODE_SUCCESS,
  SET_MAP_CENTER
} from '../actions/types'

const INITIAL_STATE = {
  nodesRoute: [],
  center: {
    lat: 52.589319,
    lng: 19.668488
  },
  nodes: []
}

export const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      const nodes = state.nodes.filter(node => node.nodId !== action.payload)
      return {
        ...state,
        nodes
      }
    case SET_MAP_CENTER:
      return {
        ...state,
        center: action.payload
      }
    case GET_NODE_ROUTE_SUCCESS:
      return {
        ...state,
        nodesRoute: action.payload
      }
    case POST_NODE_SUCCESS:
      state.nodes.push(action.payload)
      return {
        ...state
      }
    case GET_NODE_SUCCESS:
      return {
        ...state,
        nodes: action.payload || []
      }
    default:
      return state
  }
}
