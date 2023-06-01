import { Row, Col, Typography } from 'antd'
import React from 'react'


const {Title} = Typography
const Linechart = ({coinHistory, currentPrice, coinName}) => {

    if(!coinHistory) return 'Loading...' 
  return (
    <div>
        <Row  className='chart-header'>
            <Title className='chart-title' level={2}> {coinName} Price Chart</Title>
            <Col  className='price-container' >
                <Title level={5} className='price-change'>{coinHistory?.data?.change} %</Title>
                <Title level={5} className='current-price'> Current {coinName} Price : $ {currentPrice}</Title>
            </Col>
        </Row>
    </div>
  )
}

export default Linechart