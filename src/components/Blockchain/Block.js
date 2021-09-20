import React from "react";
import Transaction from "./Transaction";
import { Box, Text, Tag } from "@chakra-ui/react";
import Spacing from "../Spacing/Spacing";
import styles from "./Block.module.css";

const Block = ({ block }) => {
  const transactions = Array.isArray(block.transactions) ? block.transactions.map((tx, idx) => <Transaction transaction={tx} />) : "genesis block";
  return (
    <Box padding={2} className={styles.block}>
      <Box borderWidth="1px" borderRadius="lg" padding={4} style={{ fontSize: "8px" }}>
        <Tag size="sm">timestamp</Tag>
        <Text>{block.timestamp}</Text>
        <Spacing px={4} />
        <Tag size="sm">hash</Tag>
        <Text>{block.hash}</Text>
        <Spacing px={4} />
        <Tag size="sm">prevHash</Tag>
        <Text>{block.prevHash}</Text>
        <Spacing px={4} />
        <Tag size="sm">nonce</Tag>
        <Text>{block.nonce}</Text>
        <Spacing px={4} />
        <Tag size="sm">transactions</Tag>
        <Text></Text>
        {Array.isArray(transactions) && transactions.length === 0 ? "- no transactions" : transactions}
      </Box>
    </Box>
  );
};

export default Block;
