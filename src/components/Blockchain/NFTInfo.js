import React from "react";
import { SimpleGrid, Box, Heading, Image, Badge } from "@chakra-ui/react";
import { downloadUrlFile } from "../../util/file";

const NFTInfo = ({ nft, owner, simplify = false }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={e => {
        downloadUrlFile(`http://3.37.53.134:3004/files/${nft}`);
      }}
    >
      {!simplify && <Image src={"/cube-icon.png"} alt={"nft"} width={"100%"} />}

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
          isTruncated
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
              isTruncated
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
