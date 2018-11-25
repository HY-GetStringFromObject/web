import {
  GET_NODE_ERROR, GET_NODE_REQUEST, GET_NODE_SUCCESS,
  GET_NODE_ROUTE_ERROR, GET_NODE_ROUTE_REQUEST, GET_NODE_ROUTE_SUCCESS,
  POST_NODE_ERROR, POST_NODE_REQUEST, POST_NODE_SUCCESS,
  DELETE_NODE_ERROR, DELETE_NODE_REQUEST, DELETE_NODE_SUCCESS,
  SET_MAP_CENTER
} from './types'
import axiosClient from '../../config/axios'

export const setMapCenter = (center) => (dispatch) => {
  dispatch({type: SET_MAP_CENTER, payload: center})
}

export const deleteNode = (nodId) => async (dispatch) => {
  try {
    dispatch({type: DELETE_NODE_REQUEST})

    const res = await axiosClient()
      .delete(`/node/${nodId}`)

    dispatch({type: DELETE_NODE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: DELETE_NODE_ERROR, payload: e})
  }
}

export const getNodesRoute = (nodes) => async (dispatch) => {
  try {
    dispatch({type: GET_NODE_ROUTE_REQUEST})

    const res = await axiosClient()
      .get(`/polyline?origin=[${nodes[0].lat},${nodes[0].lng}]&destination=[${nodes[1].lat},${nodes[1].lng}]`)

    const nodesRoute = res.body

    dispatch({type: GET_NODE_ROUTE_SUCCESS, payload: nodesRoute})
  } catch (e) {
    dispatch({type: GET_NODE_ROUTE_ERROR, payload: e})
  }
}

export const postNode = () => async (dispatch, getState) => {
  try {
    dispatch({type: POST_NODE_REQUEST})

    const center = getState().map.center

    const res = await axiosClient()
      .post(`/node`, {...center})

    dispatch({type: POST_NODE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: POST_NODE_ERROR, payload: e})
  }
}

export const getNodes = () => async (dispatch) => {
  try {
    dispatch({type: GET_NODE_REQUEST})

    const res = await axiosClient()
      .get(`/node`)

    console.log(res)

    dispatch({type: GET_NODE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: GET_NODE_ERROR, payload: e})
  }
}
