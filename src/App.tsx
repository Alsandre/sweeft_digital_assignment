import { useEffect } from "react";
import Layout from "./layout/Layout";
import Pages from "./Routes";
import { useDispatch } from "react-redux";
import { syncHistory } from "./store/historySlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(syncHistory());
  }, []);
  return (
    <Layout>
      <Pages />
    </Layout>
  );
}

export default App;
