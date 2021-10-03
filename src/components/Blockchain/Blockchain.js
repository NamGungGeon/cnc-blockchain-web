import React, { useEffect, useState } from "react";
import Block from "./Block";
import Balance from "./Balance";

import { Center, Heading, Stack, Tag, Button, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Spacing from "../Spacing/Spacing";
import BlockchainToolbox from "./BlockchainToolbox";
import keypair from "../../mobx/keypair";
import { useNetwork } from "../../hooks/useNetwork";

const Blockchain = ({}) => {
  const [network] = useNetwork();

  const blockchain = network.blockchain;
  const myKeyPair = keypair.value;
  return (
    <div>
      <Center padding={"128px 0"}>
        <Heading fontSize="6xl" fontFamily="'Quicksand', sans-serif">
          C&C coin
        </Heading>
      </Center>
      <div>
        <Heading fontSize={"4xl"}>Blockchain attributes</Heading>
        <Tag>reward</Tag>
        <p>{blockchain.miningRewrad}</p>
        <Tag>chain length</Tag>
        <p>{blockchain.chain.length}</p>
        <Tag>difficulty</Tag>
        <p>{blockchain.difficulty}</p>
      </div>
      <Spacing />
      <div>
        <Heading>Your Information</Heading>
        <div>
          <Tag>Public Key (wallet address)</Tag>
          <br />
          <Text>{myKeyPair.getPublic("hex")}</Text>
        </div>
        <div>
          <Tag>Private Key (sign key)</Tag>
          <br />
          <Text>{myKeyPair.getPrivate("hex")}</Text>
        </div>
      </div>
      <Spacing />
      <div>
        <BlockchainToolbox blockchain={blockchain} />
      </div>
      <Spacing />
      <div>
        <Balance blockchain={blockchain} />
      </div>
      <Spacing />
      <div>
        <Heading fontSize={"4xl"}>Blocks</Heading>
        <Stack direction={["column", "row"]} wrap="wrap" spacing={0}>
          {blockchain.chain.map((block) => {
            return <Block block={block} />;
          })}
        </Stack>
      </div>
    </div>
  );
};

export default observer(Blockchain);
