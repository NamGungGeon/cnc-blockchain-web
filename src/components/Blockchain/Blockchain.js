import React, { useEffect, useState } from "react";
import Block from "./Block";
import Transaction from "./Transaction";
import Balance from "./Balance";

import { Center, Heading, Stack, Tag, Button, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Spacing from "../Spacing/Spacing";
import BlockchainToolbox from "./BlockchainToolbox";
import cncCoin from "../../mobx/cncCoin";
import keypair from "../../mobx/keypair";

const Blockchain = ({}) => {
  const [obsBlockchain, resetCoin] = cncCoin;
  const blockchain = obsBlockchain.value;
  const [state, setState] = useState(1);
  const myKeyPair = keypair.value;
  useEffect(() => {
    console.log(state);
    localStorage.setItem("blockchain", JSON.stringify(blockchain));
  }, [state]);
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
        <BlockchainToolbox blockchain={blockchain} onChange={() => setState(state + 1)} />
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
      <Spacing />
      <div>
        <Heading color={"pink"}>Danger Zone</Heading>
        <br />
        <Button colorScheme="pink" variant="solid" onClick={resetCoin}>
          Destroy blockchain
        </Button>
      </div>
    </div>
  );
};

export default observer(Blockchain);
