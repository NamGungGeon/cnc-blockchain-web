import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Input, InputGroup, InputLeftAddon, VStack, Heading, Box, AlertIcon } from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import CryptoJS from "crypto-js";

const NOT_FOUND_OWNER = "NOT EXIST NFT";
const FindNFTOwner = ({ blockchain, onChange, keyPair }) => {
  const [input, handleInput, setInput] = useInput({});
  const [owner, setOwner] = useState();
  const handleFindOwner = () => {
    const { nft } = input;
    if (!nft) return;
    const owner = blockchain.findNFTOwner(nft);

    if (owner) setOwner(owner);
    else setOwner(NOT_FOUND_OWNER);

    console.log(owner);
  };
  useEffect(() => {
    setOwner(null);
  }, [input]);
  return (
    <VStack spacing={4}>
      <Heading width={"100%"}>Find NFT Owner</Heading>
      <InputGroup>
        <InputLeftAddon children="NFT Token" />
        <Input placeholder="NFT Token (af4d5fa45df4af...)" variant="filled" name="nft" value={input.nft} onChange={handleInput} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="nft generator" />
        <Input
          type="file"
          placeholder={"drop file"}
          variant="filled"
          name="file"
          value={input.file}
          onChange={(e) => {
            handleInput(e);

            const file = e.target.files[0];
            console.log(file);

            var reader = new FileReader();

            reader.onload = function (event) {
              const binary = event.target.result;
              const hash = CryptoJS.SHA256(binary).toString();
              setInput({
                ...input,
                nft: hash,
              });
            };
            reader.readAsBinaryString(file);
          }}
        />
      </InputGroup>
      <Button colorScheme="blue" onClick={handleFindOwner}>
        find owner
      </Button>
      {owner && (
        <Alert status={owner === NOT_FOUND_OWNER ? "error" : "success"}>
          <AlertIcon />
          <Box width={"100%"}>
            <Heading>Owner is...</Heading>
            {owner}
          </Box>
        </Alert>
      )}
    </VStack>
  );
};

export default FindNFTOwner;
