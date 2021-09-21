import React, { useEffect, useState } from "react";
import keypair from "../../mobx/keypair";
import { observer } from "mobx-react-lite";
import { Alert, Button, ButtonGroup, Input, InputGroup, InputLeftAddon, VStack, Heading, Box, AlertIcon } from "@chakra-ui/react";
import useInput from "../../hooks/useInput";

const Balance = ({ blockchain }) => {
  const myKeyPair = keypair.value;

  const [input, handleInput] = useInput({
    addr: myKeyPair.getPublic("hex"),
  });
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    setBalance(null);
  }, [input]);

  const searchBalance = () => {
    const { addr } = input;
    if (!addr) {
      console.error("addr is required");
      return;
    }

    setBalance(blockchain.getBalanceOfAddress(addr));
  };
  return (
    <div>
      <VStack spacing={4}>
        <Heading width={"100%"}>Search balance of wallet</Heading>
        <InputGroup>
          <InputLeftAddon children="wallet address(public key)" />
          <Input placeholder="wallet address(public key)" variant="filled" name="addr" value={input.addr} onChange={handleInput} />
        </InputGroup>
        <Button colorScheme="blue" onClick={searchBalance}>
          search balance
        </Button>
        {balance !== null && (
          <Alert status={"success"}>
            <AlertIcon />
            <Box width={"100%"}>
              <Heading>Balance of {input.addr} is ...</Heading>
              {balance} coins
            </Box>
          </Alert>
        )}
      </VStack>
    </div>
  );
};

export default observer(Balance);
