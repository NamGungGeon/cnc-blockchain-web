import { observer } from "mobx-react-lite";
import React from "react";
import { Input, InputGroup, InputLeftAddon, VStack, Heading, Flex, Box } from "@chakra-ui/react";
import keypair from "../mobx/keypair";
import { useNetwork } from "../hooks/useNetwork";
import Spacing from "../components/Spacing/Spacing";
import MyNFT from "../components/Blockchain/MyNFT";
import CreateTransaction from "../components/Blockchain/CreateTransaction";
import AllNFT from "../components/Blockchain/AllNFT";

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
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="지갑 주소(공개키)" />
              <Input placeholder="from address" variant="filled" name="fromAddr" value={kp.getPublic("hex")} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="개인키" />
              <Input placeholder="from address" variant="filled" name="fromAddr" value={kp.getPrivate("hex")} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="잔고" />
              <Input placeholder="from address" variant="filled" name="fromAddr" value={network.blockchain.getBalanceOfAddress(kp.getPublic("hex"))} />
            </InputGroup>
          </VStack>
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
