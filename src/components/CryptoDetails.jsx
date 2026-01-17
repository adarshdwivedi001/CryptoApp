import React, { useState } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import { useParams } from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";
import { Col, Row, Typography, Select } from "antd";
import {
  useGetCryptosDetailsQuery,
  useGetCryptosHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
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

const { Title, Text } = Typography;
const { Option } = Select;

const safeMillify = (value) => {
  if (!value) return "N/A";
  return millify(Number(value));
};

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchingHistory } =
    useGetCryptosHistoryQuery({
      coinId,
      timePeriod,
    });

  const cryptoDetails = data?.data?.coin ?? {};

  if (isFetching || isFetchingHistory) return <Loader/>

  if (!cryptoDetails?.uuid) return <div>No data found</div>;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${safeMillify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${safeMillify(cryptoDetails?.["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${safeMillify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${safeMillify(cryptoDetails?.allTimeHigh?.price)}`,
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
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${safeMillify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${safeMillify(cryptoDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {" "}
            {cryptoDetails.name} live price in US dollers. View value
            statistics, market cap and suppply.
          </p>
        </Col>
        <Select
          className="select-timeperiod"
          defaultValue={"7d"}
          placeholder="Select time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <div className="chart-wrapper">
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails?.name}
          />
        </div>
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing the stats of all crypto currencies.</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}
              <br></br>
              {cryptoDetails.description &&
                HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="norefer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
