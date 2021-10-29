import { observer } from "mobx-react-lite";
import React from "react";
import { Input, InputGroup, InputLeftAddon, VStack, Heading, Flex, Box } from "@chakra-ui/react";
import keypair from "../mobx/keypair";
import { useNetwork } from "../hooks/useNetwork";
import Spacing from "../components/Spacing/Spacing";
import MyNFT from "../components/Blockchain/MyNFT";
import CreateTransaction from "../components/Blockchain/CreateTransaction";
import AllNFT from "../components/Blockchain/AllNFT";
import FileEater from "../components/FileEater/FileEater";
import CreateNFT from "../components/Blockchain/CreateNFT";
import Wallet from "../components/Wallet/Wallet";

const Home = () => {
  const kp = keypair.value;
  console.log("kp", kp);

  const [network] = useNetwork();

  return (
    <Flex>
      <Box w={"256px"}>
        <div>
          <Heading>내 지갑 정보</Heading>
          <br />
          <Wallet/>
        </div>
        <Spacing />
        <div>
          <Heading>NFT 만들기</Heading>
          <br />
          <CreateNFT />
        </div>
        <Spacing />
        <div>
          <Heading>나의 NFT</Heading>
          <br />
          <VStack spacing={4}>
            <MyNFT blockchain={network.blockchain} walletAddr={kp.getPublic("hex")} />
          </VStack>
        </div>
      </Box>
      <Box w={"32px"}></Box>
      <Box flex={1}>
        <div>
          <Heading>모든 NFT</Heading>
          <br />
          <AllNFT />
        </div>
      </Box>
    </Flex>
  );
};

export default observer(Home);
