import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Input, InputGroup, InputLeftAddon, VStack, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Transaction as Tx, fromPrivateKey } from "cnc-blockchain";
import useInput from "../../hooks/useInput";
import CryptoJS from "crypto-js";
import { useNetwork } from "../../hooks/useNetwork";
import { CMD_MAKE_PTX } from "cnc-blockchain";
import { getFileHash, uploadFile } from "../../http";
import useToast from "../../hooks/useToast";
import keyPair from "../../mobx/keypair";

const CreateNFT = ({}) => {
  const kp = keyPair.value;
  const defaultInput = {
    fromAddr: kp.getPublic("hex"),
    signKey: kp.getPrivate("hex"),
    toAddr: "04f22c8735ba98617ad4fe76bd27b3e569e1808e0ca2c8f3d2946b4d4eaa6ee333719325a24709b4ca354bf251beff59241deb091cc9d46cf60fdc9fdbb8e20b78",
    amount: 0,
    nft: "",
    file: null,
    fileName: "",
  };
  const [input, handleInput, setInput] = useInput(() => ({
    ...defaultInput,
  }));
  const [network] = useNetwork();
  const [addToast] = useToast();

  const handleCreate = () => {
    const { fromAddr, signKey, toAddr, amount, nft, file } = input;
    if (!toAddr) {
      addToast("toAddr is required");
      return;
    }
    if (network.blockchain.findNFTOwner(nft)) {
      addToast("이미 다른 사람에 의해 등록된 NFT입니다");
      return;
    }
    if (!file) {
      addToast("파일 정보가 없습니다");
      return;
    }
    const tx = new Tx(fromAddr, toAddr, 0, nft);
    tx.signTransaction(fromPrivateKey(signKey));
    if (file) {
      uploadFile(file)
        .then((res) => {
          console.log("upload success");
        })
        .catch((e) => {
          addToast("upload fail", e);
        });
    }

    console.log(network.blockchain.pendingTransactions.find((ptx) => ptx.fromAddr === tx.fromAddr));

    try {
      network.sendCMD(CMD_MAKE_PTX, tx);
      uploadFile(file).then((res) => {
        setInput(defaultInput);
        addToast("NFT 생성 요청이 추가되었습니다");
      });
    } catch (e) {
      console.error(e);
      addToast(e.toString());
    }
  };
  return (
    <VStack spacing={4}>
      <InputGroup>
        <InputLeftAddon children="nft" />
        <Input placeholder={"nft token"} variant="filled" name="nft" value={input.nft} />
      </InputGroup>
      <InputGroup>
        <Input
          type="file"
          placeholder={"drop file"}
          variant="filled"
          name="file"
          value={input.fileName}
          onChange={(e) => {
            const file = e.target.files[0];
            console.log(e.target.files, e.target.value);

            getFileHash(file)
              .then((res) => {
                const { hash } = res.data;
                setInput({
                  ...input,
                  nft: hash,
                  amount: 0,
                  file,
                  fileName: e.target.value,
                });
              })
              .catch((e) => {
                console.error(e);
                addToast(e.toString());
              });
          }}
        />
      </InputGroup>
      <Button colorScheme="blue" onClick={handleCreate} disabled={!input.nft}>
        NFT 생성
      </Button>
    </VStack>
  );
};

export default observer(CreateNFT);
