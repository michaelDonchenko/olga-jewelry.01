import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './reducers/userReducers'
import {
  createCategoryReducer,
  getCategoriesReducer,
  getCategoryReducer,
  removeCategoryReducer,
  updateCategoryReducer,
} from './reducers/categoryReducer'
import {
  createProductReducer,
  getProductReducer,
  getProductsReducer,
  productsWithPaginationReducer,
  removeProductReducer,
  updateProductReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
  user: userReducer,
  getCategories: getCategoriesReducer,
  getCategory: getCategoryReducer,
  removeCategory: removeCategoryReducer,
  createCategory: createCategoryReducer,
  updateCategory: updateCategoryReducer,
  createProduct: createProductReducer,
  getProducts: getProductsReducer,
  removeProduct: removeProductReducer,
  getProduct: getProductReducer,
  updateProduct: updateProductReducer,
  productsWithPagination: productsWithPaginationReducer,
  cart: cartReducer,
})

const userFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartFromLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const initialState = { user: userFromLocalStorage, cart: cartFromLocalStorage }

const middleWare = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
