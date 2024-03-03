import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const HistoryPage: React.FC = () => {
  const history = useSelector((state:RootState) => state.history)
  console.log(history)
  return (
    <>
      <h1>History</h1>
      
    </>
  );
};
