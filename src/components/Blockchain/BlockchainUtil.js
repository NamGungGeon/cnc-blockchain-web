import { CMD_MAKE_BLOCK, CMD_MAKE_PTX } from "cnc-blockchain";
import React, { useEffect } from "react";
import { useNetwork } from "../../hooks/useNetwork";
import useToast from "../../hooks/useToast";
import keypair from "../../mobx/keypair";

const BlockchainUtil = () => {
  const kp = keypair.value;
  const publicKey = kp.getPublic("hex");
  const [addToast] = useToast();
  const [network, _, setNetworkCallback] = useNetwork();
  const networkCallback = () => (type, cmd, data) => {
    // console.log("ON NETWORKCALLBACK");
    const { blockchain } = network;
    if (cmd === CMD_MAKE_PTX) {
      addToast("새로운 트랜잭션이 발견되어 자동으로 채굴을 시작합니다");
      blockchain.minePendingTransactionsAsync(publicKey, (block) => {
        console.log("mined!", block);
        network.sendCMD(CMD_MAKE_BLOCK, { block, miner: publicKey });
      });
    }
    if (cmd === CMD_MAKE_BLOCK) {
      addToast("새로운 블록이 생성되었습니다");
    }
  };

  useEffect(() => {
    setNetworkCallback(networkCallback);
    window.network = network;
  }, []);

  return <div></div>;
};

export default BlockchainUtil;
