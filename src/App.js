import { Box, Text } from "@chakra-ui/layout";
import { Route, Switch } from "react-router";
import "./App.css";
import { useNetwork } from "./hooks/useNetwork";
import Home from "./pages/Home";
import Loading from "./components/Loading/Loading";
import Toaster from "./components/Toaster/Toaster";

function App() {
  const [network, networkAvaliable] = useNetwork();
  if (!networkAvaliable) {
    return <Loading />;
  }
  return (
    <div className="root">
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
