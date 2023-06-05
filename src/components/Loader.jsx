import React from 'react'
import { Spin } from 'antd'
const Loader = () => {
  return (
    <div style={{textAlign:'center'}}>
        <Spin  tip="Loading"  size='large' />
    </div>
  )
}

export default Loader