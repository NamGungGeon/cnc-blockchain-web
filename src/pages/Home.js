import { observer } from "mobx-react-lite";
import React from "react";
import Blockchain from "../components/Blockchain/Blockchain";
import cncCoin from "../mobx/cncCoin";

const Home = () => {
  return (
    <div>
      <Blockchain />
    </div>
  );
};

export default observer(Home);
