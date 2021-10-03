import React from "react";
import { Heading, VStack, Button, Box } from "@chakra-ui/react";
import Transaction from "./Transaction";
import { CMD_MAKE_BLOCK } from "cnc-blockchain";
import { useNetwork } from "../../hooks/useNetwork";

const MiningBlock = ({ keyPair }) => {
  const [network] = useNetwork();
  const { blockchain } = network;
  return (
    <VStack spacing={4}>
      <Box width="100%">
        <Heading fontSize={"4xl"}>Pending transactions</Heading>
      </Box>
      <Box width="100%">
        {blockchain.pendingTransactions.length
          ? blockchain.pendingTransactions.map((tx) => <Transaction transaction={tx} />)
          : "There is no pending transactions"}
      </Box>
      {!!blockchain.pendingTransactions.length && (
        <Button
          colorScheme="blue"
          onClick={(e) => {
            if (!blockchain.pendingTransactions.length) {
              console.error("There is no pendingTransaction");
              return;
            }
            const block = blockchain.minePendingTransactions(keyPair.getPublic("hex"));
            network.sendCMD(CMD_MAKE_BLOCK, block);
          }}
        >
          create(mining) block
        </Button>
      )}
    </VStack>
  );
};

export default MiningBlock;
