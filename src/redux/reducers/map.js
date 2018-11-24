import { GET_NODE_ROUTE_SUCCESS, SET_MAP_CENTER } from '../actions/types'

const INITIAL_STATE = {
  nodesRoute: [],
  center: {}
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
    default:
      return state
  }
}
