import React, { useState } from 'react'
import  { Select ,Space, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory, count:simplified ? 6 : 12});
  if(!cryptoNews?.value) return 'Loading......'
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24} >
          <Select
            showSearch
            className='select-news'
            placeholder='select a crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            { data?.data?.coins?.map((currency)=> <Option value={currency.name}>{currency.name}</Option>) }
          </Select>
        </Col>
      )

      }
      {
        cryptoNews?.value.map((news, i)=> (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card 
              hoverable 
              className='news-card'
            >
              <a href={news.url} target='_blank' rel={`noreferrer`}>
                <div className="news-image-container">
                      <Title className='news-title' level={5} >{news.name}</Title>
                      <img style={{maxHeight:'100px', maxWidth:'200px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                </div>
                <p>
                  {
                    news?.description?.length > 200 ? `${news.description.substring(0,100)}...` : news.description
                  }
                </p>
                <div className="provider-container">
                  <div className="">
                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='avatar'/>
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default News