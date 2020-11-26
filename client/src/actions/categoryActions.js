import axios from 'axios'
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
} from '../types/categoryConstants'

//GET CATEGORIES
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST })

    const res = await axios.get(`/api/categories`)
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//GET CATEGORY
export const getCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST })

    const res = await axios.get(`/api/category/${slug}`)
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//DELETE CATEGORY
export const removeCategory = (slug, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST })

    await axios.delete(`/api/category/${slug}`, {
      headers: {
        authtoken,
      },
    })

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//CREATE CATEGORY
export const createCategory = (category, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST })

    const res = await axios.post(`/api/category`, category, {
      headers: {
        authtoken,
      },
    })
    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//UPDATE CATEGORY
export const updateCategory = (slug, category, authtoken) => async (
  dispatch
) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST })

    const res = await axios.put(`/api/category/${slug}`, category, {
      headers: {
        authtoken,
      },
    })
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
