import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user || user.role !== 'admin' ? (
          <Redirect to='/error-page' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
