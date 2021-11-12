import React from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Image,
  Badge,
  VStack,
  HStack
} from "@chakra-ui/react";
import { useNetwork } from "../../hooks/useNetwork";
import { receptionist } from "cnc-blockchain";
import NFTInfo from "./NFTInfo";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon, ArrowRightIcon } from "@chakra-ui/icons";
import withModal from "../../hoc/withModal";
import FindNFTOwner from "./FindNFTOwner";
import TransferNFT from "./TransferNFT";

const NFTList = ({ openModal, closeModal, targetAddr }) => {
  const [network] = useNetwork();

  const nftInfos = [];
  const getNftInfo = nft => {
    return nftInfos.find(info => info.nft === nft);
  };
  network.blockchain.chain.map((block, idx) => {
    if (idx === 0) return;

    block.transactions.map(tx => {
      if (!tx.nft) return;

      if (tx.toAddr === receptionist) {
        nftInfos.push({
          nft: tx.nft,
          owner: tx.fromAddr
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
      <VStack spacing={4}>
        <HStack spacing={4} width={"100%"} justify={"flex-end"}>
          <Box>
            <IconButton
              icon={<SearchIcon />}
              onClick={e => {
                openModal("NFT 검색", <FindNFTOwner />);
              }}
            />
          </Box>
          <Box>
            <IconButton
              icon={<ArrowRightIcon />}
              onClick={e => {
                openModal("NFT 보내기", <TransferNFT />);
              }}
            />
          </Box>
        </HStack>
        <SimpleGrid columns={4} spacingX="16px" spacingY="16px">
          {nftInfos.map(nftInfo => (
            <NFTInfo nft={nftInfo.nft} owner={nftInfo.owner} />
          ))}
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default withModal(NFTList);
