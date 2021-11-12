import React from "react";
import { useNetwork } from "../../hooks/useNetwork";
import useInput from "../../hooks/useInput";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Box
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import keypair from "../../mobx/keypair";
import useToast from "../../hooks/useToast";
import { CMD_MAKE_PTX, Transaction } from "cnc-blockchain";
import { HStack } from "@chakra-ui/layout";

const MsgMaker = ({ onDismiss, toAddr }) => {
  const kp = keypair.value;
  const [addToast] = useToast();
  const [network] = useNetwork();
  const [input, handleInput, setInput] = useInput({
    toAddr
  });
  const handleSend = () => {
    const { toAddr, message } = input;
    if (!toAddr) {
      addToast("받는 사람 주소를 입력하세요");
      return;
    }
    if (!message) {
      addToast("메시지 내용을 입력하세요");
      return;
    }
    const tx = new Transaction(kp.getPublic("hex"), toAddr, 0);
    tx.setPayload("message", message);
    tx.signTransaction(kp);

    try {
      network.sendCMD(CMD_MAKE_PTX, tx);

      addToast("메시지 전송 요청이 추가되었습니다");
      onDismiss();
    } catch (e) {
      console.error(e);
      addToast(e.toString());
    }
  };

  return (
    <VStack spacing={4}>
      <InputGroup>
        <InputLeftAddon children="받는 사람" />
        <Input
          placeholder="받는 사람 지갑 주소"
          variant="filled"
          name="toAddr"
          value={input.toAddr}
          onChange={handleInput}
        />
      </InputGroup>
      <Textarea
        name={"message"}
        value={input.message}
        onChange={handleInput}
        maxLength={500}
        placeholder="보낼 메시지를 입력하세요"
      />
      <HStack width={"100%"} justify={"flex-end"}>
        <Button colorScheme={"blue"} onClick={handleSend}>
          전송
        </Button>
        <Button onClick={onDismiss}>닫기</Button>
      </HStack>
    </VStack>
  );
};

export default MsgMaker;
