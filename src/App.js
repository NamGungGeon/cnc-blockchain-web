import { Box, Text } from "@chakra-ui/layout";
import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import theme from "./theme";

function App() {
  console.log(theme);
  return (
    <div className="root">
      {/* <Box p={4} width={"100%"} className={"nav"} bg="white" color="gray.800">
        <Text fontSize={"3xl"}>nav</Text>
      </Box> */}
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
