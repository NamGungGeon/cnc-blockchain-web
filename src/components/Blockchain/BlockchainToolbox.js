import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Input, InputGroup, InputLeftAddon, VStack, Heading } from "@chakra-ui/react";
import keypair from "../../mobx/keypair";
import { observer } from "mobx-react-lite";
import { Transaction as Tx } from "../../modules/blockchain";
import useInput from "../../hooks/useInput";
import CreateTransaction from "./CreateTransaction";
import MiningBlock from "./MiningBlock";
import Spacing from "../Spacing/Spacing";
import FindNFTOwner from "./FindNFTOwner";

const BlockchainToolbox = ({ blockchain, onChange }) => {
  const myKeyPair = keypair.value;
  return (
    <div>
      <MiningBlock blockchain={blockchain} onChange={onChange} keyPair={myKeyPair} />
      <Spacing />
      <CreateTransaction blockchain={blockchain} onChange={onChange} keyPair={myKeyPair} />
      <Spacing />
      <FindNFTOwner blockchain={blockchain} onChange={onChange} keyPair={myKeyPair} />
    </div>
  );
};

export default observer(BlockchainToolbox);
