import { useContext, useEffect } from "react";
import TestLocationsList from "./components/TestLocationsList";
import { observer } from "mobx-react-lite";
import { storeContext } from "./stores/store";

const App = observer(() => {
  const store = useContext(storeContext);

  useEffect(() => {
    store.fetchData();
  }, [store]);

  return (
    <div className="App">
      <TestLocationsList
        envList={store.envs}
        locationList={store.locations}
        serverList={store.servers}
      />
    </div>
  );
});

export default App;
