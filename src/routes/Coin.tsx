import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface CoinLocation {
  state: {
    name: string;
  };
}

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TabButton = styled(Link)`
  background-color: white;
  display: inline-block;
  display: flex;
  flex: 1;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const CoinButtonText = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "red" : "black")};
`;

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as CoinLocation;

  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  const location = useLocation();
  const priceMatch = location.pathname.includes(`/${coinId}/price`);
  const chartMatch = location.pathname.includes(`/${coinId}/chart`);

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     console.log("infoData : ", infoData);
  //     console.log("priceData : ", priceData);

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  // console.log("coinId : ", coinId);
  // console.log("state : ", state);

  return (
    <Container>
      <Header>
        <Title>{state ? state.name : ""}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview> */}

          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              {/* <span>{info?.rank}</span> */}
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              {/* <span>${info?.symbol}</span> */}
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              {/* <span>{info?.open_source ? "Yes" : "No"}</span> */}
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          {/* <Description>{info?.description}</Description> */}
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              {/* <span>{priceInfo?.total_supply}</span> */}
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              {/* <span>{priceInfo?.max_supply}</span> */}
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <TabButtons>
            <TabButton to={`/${coinId}/chart`}>
              <CoinButtonText isActive={chartMatch}>Chart</CoinButtonText>
            </TabButton>
            <TabButton to={`/${coinId}/price`}>
              <CoinButtonText isActive={priceMatch}>Price</CoinButtonText>
            </TabButton>
          </TabButtons>

          <Routes>
            <Route path={`/price`} element={<Price />} />
            <Route
              path={`/chart`}
              element={<Chart coinId={coinId} />}
            />
          </Routes>

          <div className="content">
            <Outlet />
          </div>
        </>
      )}
    </Container>
  );
}

export default Coin;
