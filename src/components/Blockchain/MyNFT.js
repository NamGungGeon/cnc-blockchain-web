import React from "react";
import { receptionist } from "cnc-blockchain";
import { useNetwork } from "../../hooks/useNetwork";
import { SimpleGrid } from "@chakra-ui/react";
import NFTInfo from "./NFTInfo";
import keypair from "../../mobx/keypair";
import { observer } from "mobx-react-lite";

const MyNFT = ({}) => {
  const walletAddr = keypair.value.getPublic("hex");
  const [network] = useNetwork();
  const nfts = [];

  network.blockchain.chain.map((block, idx) => {
    if (idx === 0) return;

    block.transactions.map(tx => {
      if (!tx.nft) return;

      if (tx.toAddr === walletAddr) {
        nfts.push(tx.nft);
      } else if (tx.fromAddr === walletAddr) {
        if (tx.toAddr === receptionist) {
          nfts.push(tx.nft);
        } else {
          nfts.splice(nfts.indexOf(tx.nft), 1);
        }
      }
    });
  });

  if (!nfts.length) {
    return <p>소유한 NFT가 없습니다</p>;
  }
  return (
    <SimpleGrid columns={4} spacingX="16px" spacingY="16px">
      {nfts.map(nft => (
        <NFTInfo nft={nft} owner={""} simplify key={nft} />
      ))}
    </SimpleGrid>
  );
};

export default observer(MyNFT);
