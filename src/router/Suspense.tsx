import * as React from "react";
import { Spin } from 'antd';

const Suspense= (Component:any) => (props:any) =>(
  <React.Suspense fallback={
    <div className="loading-wrapper">
            <Spin tip="loading" />
          </div>
  }>
    <Component {...props}/>>
  </React.Suspense>
)
export default Suspense;