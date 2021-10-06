import { observer } from "mobx-react-lite";
import React from "react";
import Blockchain from "../components/Blockchain/Blockchain";

const Lab = () => {
  return (
    <div>
      <Blockchain />
    </div>
  );
};

export default observer(Lab);
