import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack
} from "@chakra-ui/react";
import useToast from "../../hooks/useToast";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const ButtonFixed = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 256px;
  z-index: 9990;
`;
const Toaster = () => {
  const [_, __, toasts] = useToast();
  return (
    <ButtonFixed>
      <VStack spacing={4}>
        {toasts.map(toast => {
          return (
            <Alert status="error" variant="solid">
              <AlertIcon />
              <AlertTitle mr={2}>Alert</AlertTitle>
              <AlertDescription>{toast}</AlertDescription>
            </Alert>
          );
        })}
      </VStack>
    </ButtonFixed>
  );
};

export default observer(Toaster);
