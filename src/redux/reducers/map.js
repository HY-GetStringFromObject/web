import { GET_NODE_ROUTE_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  nodesRoute: []
}

export const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NODE_ROUTE_SUCCESS:
      return {
        ...state,
        nodesRoute: action.payload
      }
    default:
      return state
  }
}
