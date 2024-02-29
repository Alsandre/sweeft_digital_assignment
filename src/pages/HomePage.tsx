import {
  generatePopImgsQuery,
  generateSearchQuery,
  generateStatisticsFromID,
} from "../services/ApiServices";

export const HomePage: React.FC = () => {
  const popHandle = async () => {
    let res = await fetch(generatePopImgsQuery());
    let data = await res.json();
    console.log(data);
  };
  const searchHandle = async () => {
    let res = await fetch(generateSearchQuery({ query: "Toad", page: 1 }));
    let data = await res.json();
    console.log(data);
  };
  const statsHandle = async () => {
    let res = await fetch(generateStatisticsFromID("ZRns2R5azu0"));
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
