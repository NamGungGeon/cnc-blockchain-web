import React from "react";
import {
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text
} from "@chakra-ui/react";

const Transaction = ({ transaction }) => {
  return (
    <div px={4}>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton style={{ fontSize: "1em" }}>
              <Box flex="1" textAlign="left">
                <Text>tx {transaction.nft ? `(with nft)` : ""}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ fontSize: "1em" }}>
            <Tag size="sm">from</Tag>
            <br />
            {transaction.fromAddr?.substring(0, 10).concat("...") ||
              "mining reward"}
            <br />
            <Tag size="sm">to</Tag>
            <br />
            {transaction.toAddr.substring(0, 10).concat("...")}
            <br />
            {transaction.nft ? (
              <div>
                <Tag size="sm">nft</Tag>
                <br />
                {transaction.nft}
              </div>
            ) : (
              <div>
                <Tag size="sm">amount</Tag>
                <br />
                {transaction.amount} coins
              </div>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Transaction;
