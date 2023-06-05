import { Row, Col, Typography } from 'antd'
import React, { useEffect, useRef } from 'react'
// import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Loader from './Loader';



const {Title} = Typography
const Linechart = ({coinHistory, currentPrice, coinName}) => {

  const chartRef = useRef(null);

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }


  useEffect(() => {
    // Get the canvas element
    const canvas = chartRef.current;

    // Define the data for the chart
    const data = {
      labels: coinTimestamp,
      datasets: [
        {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                tension: 0.1,
        },
      ]
    };

    // Define the options for the chart
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Create the Line Chart instance
    const lineChart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: options
    });

    // Cleanup
    return () => lineChart.destroy();
  }, [coinHistory]);

  // console.log(options,data)

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
        {/* <Line  data={data} options={options} /> */}
        <canvas ref={chartRef}></canvas>;
    </div>
  )
}

export default Linechart







