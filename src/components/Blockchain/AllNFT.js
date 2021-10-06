import React from "react";
import { SimpleGrid, Box, Heading, Image, Badge } from "@chakra-ui/react";
import { useNetwork } from "../../hooks/useNetwork";
import { receptionist } from "cnc-blockchain";
import NFTInfo from "./NFTInfo";

const AllNFT = () => {
  const [network] = useNetwork();

  const nftInfos = [];
  const getNftInfo = (nft) => {
    return nftInfos.find((info) => info.nft === nft);
  };
  network.blockchain.chain.map((block, idx) => {
    if (idx === 0) return;

    block.transactions.map((tx) => {
      if (!tx.nft) return;

      if (tx.toAddr === receptionist) {
        nftInfos.push({
          nft: tx.nft,
          owner: tx.fromAddr,
        });
      } else {
        const nftInfo = getNftInfo(tx.fromAddr);
        if (nftInfo) {
          nftInfo.owner = tx.toAddr;
        }
      }
    });
  });

  if (nftInfos.length === 0) return <p>네트워크에 NFT가 존재하지 않습니다</p>;
  return (
    <div>
      <SimpleGrid columns={3} spacingX="40px" spacingY="20px">
        {nftInfos.map((nftInfo) => (
          <NFTInfo nft={nftInfo.nft} owner={nftInfo.owner} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AllNFT;
