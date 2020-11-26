import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_ERROR_RESET,
  DELETE_CATEGORY_SUCCESS_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_ERROR_RESET,
  UPDATE_CATEGORY_RESET,
} from '../types/categoryConstants'

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true }
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      }
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getCategoryReducer = (
  state = { category: {}, products: [] },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true }
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        success: true,
        products: action.payload.products,
      }
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false }
    case GET_CATEGORY_RESET:
      return { category: {} }
    default:
      return state
  }
}

export const removeCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true }
    case DELETE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Category deleted successfully',
      }
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_CATEGORY_SUCCESS_RESET:
      return { success: '' }
    default:
      return state
  }
}

export const createCategoryReducer = (
  state = { createdCategory: {} },
  action
) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true }
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, createdCategory: action.payload }
    case CREATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CREATE_CATEGORY_ERROR_RESET:
      return { error: '' }

    default:
      return state
  }
}

export const updateCategoryReducer = (
  state = { updatedCategory: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true }
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, updatedCategory: action.payload, success: true }
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case UPDATE_CATEGORY_ERROR_RESET:
      return { error: '' }
    case UPDATE_CATEGORY_RESET:
      return { updatedCategory: {} }

    default:
      return state
  }
}
