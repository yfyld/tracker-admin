import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import {  localStore } from '@/utils'



const PrivateRoute = ({ component: Component, ...rest }:RouteProps) => (
  <Route {...rest} render={props => (
    localStore.getSyncItem("token")? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute