import { Col, Collapse, Row } from "antd";
import React from "react";
const { Panel } = Collapse;

const Exchanges = () => {
  return (
    <div>
      <div className="exchange-container">
        <Row>
          <Col span={9}>Exchanges</Col>
          <Col span={5}>24h Trade Volume</Col>
          <Col span={5}>Markets</Col>
          <Col span={5}>Change</Col>
        </Row>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="This is panel header 1" key="1">
            <Row>
              <Col span={9}>Exchanges</Col>
              <Col span={5}>24h Trade Volume</Col>
              <Col span={5}>Markets</Col>
              <Col span={5}>Change</Col>
            </Row>
          </Panel>

          <Panel header="This is panel header 1" key="2">
            <Row>
              <Col span={9}>Exchanges</Col>
              <Col span={5}>24h Trade Volume</Col>
              <Col span={5}>Markets</Col>
              <Col span={5}>Change</Col>
            </Row>
          </Panel>
          
          <Panel header="This is panel header 1" key="3">
            <Row>
              <Col span={9}>Exchanges</Col>
              <Col span={5}>24h Trade Volume</Col>
              <Col span={5}>Markets</Col>
              <Col span={5}>Change</Col>
            </Row>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Exchanges;
