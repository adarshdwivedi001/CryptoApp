import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(Number(coinHistory.data.history[i].price));
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString()
    );
  }

  const minPrice = Math.min(...coinPrice);
  const maxPrice = Math.max(...coinPrice);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
        borderColor: "#0071bd",
        backgroundColor: "rgba(0, 113, 189, 0.1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#1a1a2e",
          font: {
            size: 12,
            weight: "600",
          },
        },
      },
    },
    scales: {
      y: {
        min: minPrice - (maxPrice - minPrice) * 0.05,
        max: maxPrice + (maxPrice - minPrice) * 0.05,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: "#666",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
      },

      x: {
        ticks: {
          maxTicksLimit: 10,
          color: "#666",
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <div className="chart-canvas-wrapper">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
