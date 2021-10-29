import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Heading, Image, Badge } from "@chakra-ui/react";
import { getFileFromNFT } from "../../http";
import { downloadUrlFile } from "../../util/file";
import Background from "../Background/Background";
import Spacing from "../Spacing/Spacing";

const NFTInfo = ({ nft, owner, simplify = false }) => {
  const [detail, setDetail] = useState(false);
  const [fileType, setFileType] = useState("");
  useEffect(() => {
    getFileFromNFT(nft)
      .then(res => {
        const contentType = res.headers["content-type"];
        setFileType(contentType);
      })
      .catch(console.error);
  }, [nft]);

  const filePath = `http://3.37.53.134:3004/files/${nft}`;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onMouseOver={e => {
        setDetail(true);
      }}
      onMouseOut={e => {
        setDetail(false);
      }}
    >
      <div
        onClick={e => {
          downloadUrlFile(filePath);
        }}
      >
      {!simplify &&
        (fileType.includes("image") ? (
          <Background
            src={filePath}
            alt={"nft"}
            height={"150px"}
            width={"100%"}
          />
        ) : (
          <Background
            src={"/cube-icon.png"}
            alt={"nft"}
            height={"150px"}
            width={"100%"}
          />
        ))}

      <Spacing px={0} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            NFT Token Value
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated={!detail}
        >
          {nft}
        </Box>

        {owner && (
          <>
            <br />
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="green">
                Owner
              </Badge>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated={!detail}
            >
              {owner}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default NFTInfo;
