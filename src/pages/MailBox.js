import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Wallet from "../components/Wallet/Wallet";
import Messenger from "../components/Blockchain/Messenger";
import { Flex } from "@chakra-ui/layout";

const MailBox = () => {
  return (
    <Flex>
      <Box w={"256px"}>
        <div>
          <Heading>내 지갑 정보</Heading>
          <br />
          <Wallet />
        </div>
      </Box>
      <Box w={"16px"} />
      <Box flex={1}>
        <Heading>받은 메시지</Heading>
        <Messenger />
      </Box>
    </Flex>
  );
};

export default MailBox;
