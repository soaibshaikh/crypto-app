import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import { Col, Avatar, Row, Typography, Select } from "antd";
import HTMLReactParser from "html-react-parser";

import Linechart from "./Linechart";
import Loader from "./Loader";

const { Title, Text } = Typography;
const Option = Select;




const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const [timePeriod, setTimePeriod] = useState("7d");
  const {data: coinHistory}= useGetCryptoHistoryQuery({coinId,timePeriod})
  const cryptoDetails = data?.data?.coin;


  if(isFetching) return <Loader/>;

  // const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];


  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Row   gutter={[8,24]} className="coin-detail-container">
        <Col span={24} className="coin-heading-container">
          <Avatar shape="square" size={64} src={<img src={cryptoDetails?.iconUrl} alt={cryptoDetails?.name}/>} />
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </Title>
          <p>
            {" "}
            {cryptoDetails?.name} live price in US dollers. view value
            statistics, market cap and supply.{" "}
          </p>
        </Col>
        <Col  style={{ display: 'flex' , justifyContent: 'center' }} span={24}>
          <Select
            defaultValue={"7d"}
            className="select-timeperiod"
            placeholder="Select Time Period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => <Option key={date}> {date}</Option>
            )}
          </Select>
        </Col>

        <Col span={22} style={{margin: 'auto'}} >
              <Linechart coinHistory={coinHistory} currentPrice={ millify(+cryptoDetails?.price)} coinName={cryptoDetails?.name} />
        </Col>
        <Col span={24}>
          <Row justify="space-between" className="stats-container">
            <Col span={{xs: '12', sm: '10', md: '8'}} className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails?.name} Value Statistics
                </Title>
                <p>An overview showing the stats of {cryptoDetails?.name}</p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
            <Col span={{xs: '12', sm: '10', md: '8'}} className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  Other Statistics
                </Title>
                <p>An overview showing the stats of all cryptocurrencies</p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Col span={24} className="coin-desc"
          >
            <Title className="coin-details-heading" level={3}>
              What is {cryptoDetails?.name} ?
            </Title>
            {HTMLReactParser(`${cryptoDetails?.description}`)}
          </Col>
        </Col>
        <Col span={24}>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails?.name} Links
              </Title>
              {cryptoDetails?.links?.map((link) => (
                <Row     className="coin-link" key={link.name}>
                  <Title level={5} className="link-name">
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}
            </Col>
        </Col>
      </Row>
    </>
  );
};

export default CryptoDetails;
