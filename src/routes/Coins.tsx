import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinInfoWrapper = styled.div`
  display: flex;
`;

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
    console.log("coins : ", coins);
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      <CoinsList>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {coins.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <CoinInfoWrapper>
                    <div>
                      <Img
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                    </div>
                    <div style={{ alignSelf: "center" }}>{coin.name}</div>
                  </CoinInfoWrapper>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;