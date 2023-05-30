import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic} from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from './';

const {Title} = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  // console.log('stats', stats);
 
  if(isFetching) return 'Loading ....'
  // console.log(data);
  return (
    <>
      <Title level={2} className='heading'>Global Crypto stats</Title>
      <Row>
        <Col span={12} > <Statistic title='Total Crytocurrencies' value={ millify(globalStats.total)}></Statistic></Col>
        <Col span={12} > <Statistic title='Total Exchanges' value={ millify(globalStats.totalExchanges)}></Statistic></Col>
        <Col span={12} > <Statistic title='Total Market Cap' value={ millify(globalStats.totalMarketCap)}></Statistic></Col>
        <Col span={12} > <Statistic title='Total 24h Volume' value={ millify(globalStats.total24hVolume)}></Statistic></Col>
        <Col span={12} > <Statistic title='Total Markets' value={ millify(globalStats.totalMarkets)}></Statistic></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in  the world!</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className='home-title'>latest Crypto News!</Title>
        <Title level={3} className='show-more'><Link to='/news'>show more</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage