import {
  CREATE_PRODUCT_ERROR_RESET,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_SUCCESS_RESET,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS_RESET,
  DELETE_PRODUCT_ERROR_RESET,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_ERROR_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS_RESET,
  GET_BESTSELLERS_SUCCESS,
  PRODUCTS_WITH_PAGINATION_SUCCESS,
  PRODUCTS_WITH_PAGINATION_REQUEST,
  PRODUCTS_WITH_PAGINATION_FAIL,
} from '../types/productConstants'

export const createProductReducer = (
  state = { createdProduct: {} },
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, createdProduct: action.payload, success: true }
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CREATE_PRODUCT_ERROR_RESET:
      return { error: '' }
    case CREATE_PRODUCT_SUCCESS_RESET:
      return { success: false }

    default:
      return state
  }
}

export const getProductsReducer = (
  state = { products: [], bestSellers: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      }
    case GET_BESTSELLERS_SUCCESS:
      return {
        ...state,
        loading: false,
        bestSellers: action.payload,
      }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Product deleted successfully',
      }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_PRODUCT_SUCCESS_RESET:
      return { success: '' }
    case DELETE_PRODUCT_ERROR_RESET:
      return { error: '' }
    default:
      return state
  }
}

export const getProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { loading: true }
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, success: true }
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case GET_PRODUCT_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const updateProductReducer = (
  state = { updatedProduct: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, updatedProduct: action.payload, success: true }
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case UPDATE_PRODUCT_ERROR_RESET:
      return { error: '' }
    case UPDATE_PRODUCT_SUCCESS_RESET:
      return { success: false }

    default:
      return state
  }
}

export const productsWithPaginationReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_WITH_PAGINATION_REQUEST:
      return { loading: true }
    case PRODUCTS_WITH_PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case PRODUCTS_WITH_PAGINATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
