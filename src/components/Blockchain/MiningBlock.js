import React from "react";
import { Heading, VStack, Button, Box } from "@chakra-ui/react";
import Transaction from "./Transaction";

const MiningBlock = ({ blockchain, onChange, keyPair }) => {
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
            blockchain.minePendingTransactions(keyPair.getPublic("hex"));
            onChange();
          }}
        >
          create(mining) block
        </Button>
      )}
    </VStack>
  );
};

export default MiningBlock;
