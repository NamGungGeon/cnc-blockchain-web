import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Heading, Flex, Box, Switch, HStack } from "@chakra-ui/react";
import keypair from "../mobx/keypair";
import { useNetwork } from "../hooks/useNetwork";
import Spacing from "../components/Spacing/Spacing";
import MyNFT from "../components/Blockchain/MyNFT";
import AllNFT from "../components/Blockchain/NFTList";
import CreateNFT from "../components/Blockchain/CreateNFT";
import Wallet from "../components/Wallet/Wallet";

const Home = () => {
  const kp = keypair.value;
  console.log("kp", kp);

  const [network] = useNetwork();
  const [onlyMine, setOnlyMine] = useState(false);

  return (
    <Flex>
      <Box w={"256px"}>
        <div>
          <Heading>내 지갑 정보</Heading>
          <br />
          <Wallet />
        </div>
        <Spacing />
        <div>
          <Heading>NFT 만들기</Heading>
          <br />
          <CreateNFT />
        </div>
      </Box>
      <Box w={"16px"}></Box>
      <Box flex={1}>
        <div>
          <HStack spacing={4}>
            <span>내 소유의 NFT만 보기</span>
            <Switch
              size={"lg"}
              isChecked={onlyMine}
              onChange={e => {
                console.log("switch", e.target.checked);
                setOnlyMine(e.target.checked);
              }}
            />
          </HStack>
          <Spacing px={32} />
          {onlyMine ? <MyNFT /> : <AllNFT />}
        </div>
      </Box>
    </Flex>
  );
};

export default observer(Home);
