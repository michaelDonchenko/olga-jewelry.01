import axios from 'axios'
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  GET_BESTSELLERS_SUCCESS,
  PRODUCTS_WITH_PAGINATION_SUCCESS,
  PRODUCTS_WITH_PAGINATION_REQUEST,
  PRODUCTS_WITH_PAGINATION_FAIL,
} from '../types/productConstants'

//CREATE PRODUCT
export const createProduct = (product, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })

    const res = await axios.post(`/api/product`, product, {
      headers: {
        authtoken,
      },
    })
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//GET PRODUCTS
export const productsWithPagination = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_WITH_PAGINATION_REQUEST })

    const res = await axios.get(`/api/products?pageNumber=${pageNumber}`)
    dispatch({
      type: PRODUCTS_WITH_PAGINATION_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_WITH_PAGINATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//DELETE PRODUCT
export const removeProduct = (slug, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })

    await axios.delete(`/api/product/${slug}`, {
      headers: {
        authtoken,
      },
    })

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//GET PRODUCT
export const getProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST })

    const res = await axios.get(`/api/product/${slug}`)
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//UPDATE PRODUCT
export const updateProduct = (slug, product, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })

    const res = await axios.put(`/api/product/${slug}`, product, {
      headers: {
        authtoken,
      },
    })
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//GET PRODUCTS BY SORT
export const getProducts = (sort, order, limit) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST })

    const res = await axios.post(`/api/products`, { sort, order, limit })
    if (sort === 'sold') {
      dispatch({
        type: GET_BESTSELLERS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      })
    }
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
