import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/authPages/Register'
import Home from './pages/Home'

import './index.css'
import Login from './pages/authPages/Login'
import RegisterComplete from './pages/authPages/RegisterComplete'
import ForgotPassword from './pages/authPages/ForgotPassword'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
import UserHistory from './pages/user/UserHistory'
import UserWhishlist from './pages/user/UserWhishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import ErrorPage from './pages/admin/ErrorPage'
import CategoryCreate from './pages/admin/CategoryCreate'
import CategoryUpdate from './pages/admin/CategoryUpdate'
import ProductCreate from './pages/admin/ProductCreate'
import ProductsPage from './pages/admin/ProductsPage'
import ProductUpdate from './pages/admin/ProductUpdate'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import BankTransfer from './pages/BankTransfer'
import PhonePayment from './pages/PhonePayment'
import AdminOrder from './pages/admin/AdminOrder'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/complete" exact component={RegisterComplete} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot/password" exact component={ForgotPassword} />
          <Route path="/error-page" exact component={ErrorPage} />
          <Route path="/product/:slug" exact component={ProductPage} />
          <Route path="/category/:slug" exact component={CategoryPage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route path="/shop/page/:pageNumber" exact component={ShopPage} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/bankTransfer" exact component={BankTransfer} />
          <Route path="/phonePayment" exact component={PhonePayment} />
          <PrivateRoute path="/user/history" exact component={UserHistory} />
          <PrivateRoute
            path="/user/whishlist"
            exact
            component={UserWhishlist}
          />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/dashboard/:pageNumber"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/admin/order/:id" exact component={AdminOrder} />
          <AdminRoute path="/admin/category" exact component={CategoryCreate} />
          <AdminRoute
            path="/admin/category/:slug"
            exact
            component={CategoryUpdate}
          />
          <AdminRoute path="/admin/product/" exact component={ProductCreate} />
          <AdminRoute path="/admin/products/" exact component={ProductsPage} />
          <AdminRoute
            path="/admin/products/:pageNumber"
            exact
            component={ProductsPage}
          />

          <AdminRoute
            path="/admin/product/:slug"
            exact
            component={ProductUpdate}
          />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
