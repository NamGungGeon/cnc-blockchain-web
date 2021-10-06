import React from "react";
import { Heading, VStack, Button, Box } from "@chakra-ui/react";
import Transaction from "./Transaction";
import { CMD_MAKE_BLOCK, CMD_REQUEST_FULLBLOCK } from "cnc-blockchain";
import { useNetwork } from "../../hooks/useNetwork";
import useToast from "../../hooks/useToast";

const MiningBlock = ({ keyPair }) => {
  const [addToast] = useToast();
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
              addToast("There is no pendingTransaction");
              return;
            }
            blockchain.minePendingTransactionsAsync(keyPair.getPublic("hex"), (block) => {
              try {
                if (block) {
                  network.sendCMD(CMD_MAKE_BLOCK, { block, miner: keyPair.getPublic("hex") });
                } else {
                  network.sendCMD(CMD_REQUEST_FULLBLOCK);
                }
              } catch (e) {
                console.error(e);
                addToast(e.toString());
              }
            });
          }}
        >
          create(mining) block
        </Button>
      )}
    </VStack>
  );
};

export default MiningBlock;
