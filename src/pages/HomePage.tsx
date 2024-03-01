import { useState } from "react";
import {
  generatePopImgsQuery,
  generateSearchQuery,
  generateStatisticsFromID,
} from "../services/ApiServices";
import { TImageData, TQuery } from "../types";
import { ImageList } from "../components";

export const HomePage: React.FC = () => {
  const [data, setData] = useState([]);
  const popHandle = async () => {
    let res = await fetch(generatePopImgsQuery({ page: 1 } as TQuery));
    let data = await res.json();
    console.log(data);
  };
  const searchHandle = async () => {
    let res = await fetch(
      generateSearchQuery({ query: "Toad", page: 1 } as TQuery)
    );
    let data = await res.json();
    let imageList = data.results.map(
      (imageData: TImageData) =>
        ({ ...imageData } as Pick<TImageData, keyof TImageData>)
    );
    setData(imageList);
    console.log(data);
  };
  const statsHandle = async () => {
    let res = await fetch(
      generateStatisticsFromID({ id: "ZRns2R5azu0" } as TQuery)
    );
    let data = await res.json();
    console.log(data);
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={popHandle}>pop</button>
      <button onClick={searchHandle}>search</button>
      <button onClick={statsHandle}>stats</button>
      {data.length > 0 && <ImageList imageList={data} />}
    </>
  );
};
