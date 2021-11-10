import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  HStack
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";
import keypair from "../../mobx/keypair";
import { useNetwork } from "../../hooks/useNetwork";
import withModal from "../../hoc/withModal";
import { fromPrivateKey } from "cnc-blockchain";
import useToast from "../../hooks/useToast";
import useInput from "../../hooks/useInput";

const Wallet = ({ openModal, closeModal, isOpenModal }) => {
  const kp = keypair.value;
  const [network] = useNetwork();

  const [input, handleInput, setInput] = useInput({});
  const [addToast] = useToast();

  useEffect(() => {
    if (!isOpenModal) setInput({});
  }, [isOpenModal]);

  const handleUpdateWallet = () => {
    openModal(
      "지갑 정보 변경",
      <div>
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftAddon children="새로운 개인키" />
            <Input
              placeholder="private key"
              variant="filled"
              name="newPrivateKey"
              value={input.newPrivateKey}
              onChange={handleInput}
            />
          </InputGroup>
        </VStack>
      </div>,
      <HStack>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            try {
              const newKp = fromPrivateKey(input.newPrivateKey);
              if (newKp) {
                //check private key is valid
                //if invalid, getPublic throw exception
                newKp.getPublic("hex");

                keypair.value = newKp;
                closeModal();
              } else {
                throw "invalid private key";
              }
            } catch (e) {
              console.error("cannot update wallet", e.toString());
              addToast("지갑 정보 업데이트 중 오류가 발생했습니다");
            }
          }}
        >
          저장
        </Button>
        <Button onClick={closeModal}>닫기</Button>
      </HStack>
    );
  };

  return (
    <div>
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftAddon children="지갑 주소(공개키)" />
          <Input
            placeholder="from address"
            variant="filled"
            name="fromAddr"
            value={kp.getPublic("hex")}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="개인키" />
          <Input
            placeholder="from address"
            variant="filled"
            name="fromAddr"
            value={kp.getPrivate("hex")}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="잔고" />
          <Input
            placeholder="from address"
            variant="filled"
            name="fromAddr"
            value={network.blockchain.getBalanceOfAddress(kp.getPublic("hex"))}
          />
        </InputGroup>
        <Button
          colorScheme={"blue"}
          onClick={handleUpdateWallet}
          width={"100%"}
        >
          지갑 정보 변경
        </Button>
      </VStack>
    </div>
  );
};

export default observer(withModal(Wallet));
