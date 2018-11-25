import {
  DELETE_NODE_ERROR,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,
  GET_NODE_ERROR,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  GET_NODE_ROUTE_ERROR,
  GET_NODE_ROUTE_REQUEST,
  GET_NODE_ROUTE_SUCCESS,
  POST_NODE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  SET_MAP_CENTER,
  POST_SEGMENT_REQUEST,
  POST_SEGMENT_SUCCESS,
  POST_SEGMENT_ERROR,
  SET_SEGMENT,
  GET_POLYLINE_REQUEST,
  GET_POLYLINE_SUCCESS,
  GET_POLYLINE_ERROR,
  GET_SEGMENT_SUCCESS,
  GET_SEGMENT_REQUEST,
  GET_SEGMENT_ERROR,
  GET_ROUTE_REQUEST, GET_ROUTE_SUCCESS, GET_ROUTE_ERROR
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

    dispatch({type: GET_NODE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: GET_NODE_ERROR, payload: e})
  }
}

export const getPolyline = (segment) => async (dispatch) => {
  try {
    dispatch({type: GET_POLYLINE_REQUEST})

    const res = await axiosClient()
      .get(`/polyline?origin=${segment.firstNode.lat},${segment.firstNode.lng}&destination=${segment.secondNode.lat},${segment.secondNode.lng}`)

    dispatch({type: GET_POLYLINE_SUCCESS, payload: res.data.polyline})
  } catch (e) {
    dispatch({type: GET_POLYLINE_ERROR, payload: e})
  }
}

export const getRoute = (nodes) => async (dispatch) => {
  try {
    dispatch({type: GET_ROUTE_REQUEST})
    console.log(nodes)
    const res = await axiosClient()
      .get(`/route/${nodes[0]}/${nodes[1]}`)

    dispatch({type: GET_ROUTE_SUCCESS, payload: {polyline: res.data.polyline, first: nodes[0], last: nodes[1]}})
  } catch (e) {
    dispatch({type: GET_ROUTE_ERROR, payload: e})
  }
}

export const postSegment = (name) => async (dispatch, getState) => {
  try {
    dispatch({type: POST_SEGMENT_REQUEST})

    const nodes = getState().map.segment

    const data = {
      firstNode: {
        ...nodes[0]
      },
      secondNode: {
        ...nodes[1]
      },
      name,
      length: 1
    }

    const res = await axiosClient()
      .post(`/segment`, data)

    dispatch({type: POST_SEGMENT_SUCCESS, payload: res.data})

    return res.data
  } catch (e) {
    console.log(e)
    dispatch({type: POST_SEGMENT_ERROR, payload: e})
  }
}

export const getSegments = () => async (dispatch) => {
  try {
    dispatch({type: GET_SEGMENT_REQUEST})

    const res = await axiosClient()
      .get(`/segment`)

    dispatch({type: GET_SEGMENT_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: GET_SEGMENT_ERROR, payload: e})
  }
}

export const setSegment = (nodes) => (dispatch) => {
  dispatch({type: SET_SEGMENT, payload: nodes})
}
