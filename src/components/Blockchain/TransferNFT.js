import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack
} from "@chakra-ui/react";
import keypair from "../../mobx/keypair";
import { useNetwork } from "../../hooks/useNetwork";
import useInput from "../../hooks/useInput";
import useToast from "../../hooks/useToast";
import {
  Transaction as Tx,
  fromPrivateKey,
  CMD_MAKE_PTX
} from "cnc-blockchain";

const TransferNFT = ({}) => {
  const kp = keypair.value;
  const [network] = useNetwork();

  const [input, handleInput, setInput] = useInput({});
  const [addToast] = useToast();

  const handleTransfer = () => {
    const { toAddr, nft } = input;
    const fromAddr = kp.getPublic("hex");

    if (!toAddr || !nft) {
      addToast("받는 사람 지갑 주소와 NFT를 모두 입력해야 합니다");
      return;
    }
    console.log("nftowner", network.blockchain.findNFTOwner(nft));
    if (network.blockchain.findNFTOwner(nft) !== fromAddr) {
      addToast("본인 소유의 NFT 만 전송할 수 있습니다");
      return;
    }

    const tx = new Tx(fromAddr, toAddr, 0, nft);
    tx.signTransaction(kp);

    try {
      network.sendCMD(CMD_MAKE_PTX, tx);
      addToast("트랜잭션이 추가되었습니다");
    } catch (e) {
      console.error(e, network);
      addToast(e.toString());
    }

    setInput({});
  };

  return (
    <div>
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftAddon children="수신자 지갑 주소" />
          <Input
            placeholder="받는 사람 지갑 주소 (공개키 값)"
            variant="filled"
            name="toAddr"
            onChange={handleInput}
            value={input.toAddr}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="NFT" />
          <Input
            placeholder="본인이 소유한 NFT"
            variant="filled"
            name="nft"
            onChange={handleInput}
            value={input.nft}
          />
        </InputGroup>
        <Button colorScheme={"blue"} onClick={handleTransfer} width={"100%"}>
          NFT 전송
        </Button>
      </VStack>
    </div>
  );
};

export default TransferNFT;
