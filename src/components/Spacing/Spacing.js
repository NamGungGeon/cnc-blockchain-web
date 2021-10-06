import React from "react";
import { Divider, Box } from "@chakra-ui/layout";

const Spacing = ({ px }) => {
  return (
    <Box style={{ padding: `${px ?? 64}px 0` }}>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Spacing;
