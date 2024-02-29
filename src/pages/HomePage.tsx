import {
  generatePopImgsQuery,
  generateSearchQuery,
  generateStatisticsFromID,
} from "../services/ApiServices";
import { TQuery } from "../types";

export const HomePage: React.FC = () => {
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
    </>
  );
};
