import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId?: string | undefined;
}

function Chart({ coinId }: ChartProps) {
  console.log("coinId : ", coinId);

  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return <div>Chart {coinId}</div>;
}

export default Chart;
