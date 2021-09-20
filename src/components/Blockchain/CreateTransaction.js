import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Input, InputGroup, InputLeftAddon, VStack, Heading } from "@chakra-ui/react";
import keypair from "../../mobx/keypair";
import { observer } from "mobx-react-lite";
import Test from "../../modules/blockchain";
import useInput from "../../hooks/useInput";
import CryptoJS from "crypto-js";
import { fromPrivateKey } from "../../modules/keygen";

const Tx = Test.Transaction;
console.log(Test);
const CreateTransaction = ({ blockchain, onChange, keyPair }) => {
  console.log(Tx);
  const defaultInput = {
    fromAddr: keyPair.getPublic("hex"),
    signKey: keyPair.getPrivate("hex"),
    toAddr: "04f22c8735ba98617ad4fe76bd27b3e569e1808e0ca2c8f3d2946b4d4eaa6ee333719325a24709b4ca354bf251beff59241deb091cc9d46cf60fdc9fdbb8e20b78",
    amount: 0,
    nft: "",
    file: "",
  };
  const [input, handleInput, setInput] = useInput(() => ({
    ...defaultInput,
  }));
  useEffect(() => {
    console.log("input update: ", input);
  }, [input]);

  const handleCreate = () => {
    const { fromAddr, signKey, toAddr, amount, nft } = input;
    if (!toAddr) {
      console.error("toAddr is required");
      return;
    }
    const tx = new Tx(fromAddr, toAddr, amount, nft);
    tx.signTransaction(fromPrivateKey(signKey));
    blockchain.addTransaction(tx);

    onChange();
    setInput(defaultInput);
  };
  return (
    <VStack spacing={4}>
      <Heading width={"100%"}>Create transaction</Heading>
      <InputGroup>
        <InputLeftAddon children="from address" />
        <Input placeholder="from address" variant="filled" name="fromAddr" value={input.fromAddr} onChange={handleInput} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="signKey" />
        <Input placeholder="signKey (private key of from addr)" variant="filled" name="signKey" value={input.signKey} onChange={handleInput} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="to address" />
        <Input placeholder="to address" variant="filled" name="toAddr" value={input.toAddr} onChange={handleInput} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="coin amount" />
        <Input type={"number"} placeholder="coin amount" variant="filled" name="amount" value={input.amount} onChange={handleInput} disabled={input.nft} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="nft" />
        <Input placeholder={"nft token"} variant="filled" name="nft" value={input.nft} onChange={handleInput} />
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
      <Button colorScheme="blue" onClick={handleCreate}>
        create Transaction
      </Button>
    </VStack>
  );
};

export default observer(CreateTransaction);
