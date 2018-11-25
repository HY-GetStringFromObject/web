import {
  GET_NODE_ROUTE_SUCCESS,
  GET_NODE_SUCCESS, GET_SEGMENT_SUCCESS,
  POST_NODE_SUCCESS,
  POST_SEGMENT_SUCCESS,
  SET_MAP_CENTER, SET_SEGMENT
} from '../actions/types'

const INITIAL_STATE = {
  nodesRoute: [],
  center: {
    lat: 52.589319,
    lng: 19.668488
  },
  nodes: [{
    lat: 52.589319,
    lng: 19.668488,
    nodId: 1
  },
  {
    lat: 52.590329,
    lng: 19.668488,
    nodId: 2
  }],
  segment: [],
  segments: [{
    firstNode:
      {
        lat: 52.589319,
        lng: 19.668488,
        nodId: 1
      },
    secondNode: {
      lat: 52.590329,
      lng: 19.668488,
      nodId: 2
    }}]
}

export const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case POST_SEGMENT_SUCCESS:
      state.segments.push(action.payload)
      return {
        ...state
      }
    case GET_SEGMENT_SUCCESS:
      return {
        ...state,
        segments: action.payload
      }
    case SET_SEGMENT:
      return {
        ...state,
        segment: action.payload
      }
    default:
      return state
  }
}
